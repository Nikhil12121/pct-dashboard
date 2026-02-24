"""
Thoughtspot Service - Handles all Thoughtspot API interactions
"""

import httpx
import json
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class ThoughtspotService:
    """
    Service to interact with Thoughtspot REST API
    
    Documentation: https://docs.thoughtspot.com/cloud/latest/rest-api-reference
    """
    
    def __init__(self, host: str, username: str, password: str):
        """
        Initialize Thoughtspot service
        
        Args:
            host: Thoughtspot instance URL (e.g., https://your-instance.thoughtspot.cloud)
            username: Thoughtspot username
            password: Thoughtspot password
        """
        self.host = host.rstrip('/') if host else None
        self.username = username
        self.password = password
        self.client = httpx.AsyncClient(timeout=30.0)
        self.auth_token = None
        
        if not self.host:
            logger.warning("Thoughtspot host not configured")
    
    
    async def authenticate(self) -> bool:
        """
        Authenticate with Thoughtspot and get session token
        
        Returns:
            True if authentication successful, False otherwise
        """
        if not self.host or not self.username or not self.password:
            logger.error("Thoughtspot credentials not configured")
            return False
        
        try:
            # Thoughtspot login endpoint
            url = f"{self.host}/api/rest/2.0/auth/session/login"
            
            payload = {
                "username": self.username,
                "password": self.password
            }
            
            response = await self.client.post(url, json=payload)
            
            if response.status_code == 200:
                # Extract token from response
                data = response.json()
                self.auth_token = data.get("token")
                logger.info("✅ Thoughtspot authentication successful")
                return True
            else:
                logger.error(f"❌ Thoughtspot auth failed: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Thoughtspot authentication error: {str(e)}")
            return False
    
    
    async def check_connection(self) -> bool:
        """
        Check if Thoughtspot connection is active
        
        Returns:
            True if connected, False otherwise
        """
        if not self.auth_token:
            return await self.authenticate()
        
        try:
            # Try a simple API call to verify connection
            url = f"{self.host}/api/rest/2.0/auth/session/user"
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            
            response = await self.client.get(url, headers=headers)
            
            if response.status_code == 200:
                return True
            else:
                # Token might be expired, re-authenticate
                return await self.authenticate()
                
        except Exception as e:
            logger.error(f"Connection check failed: {str(e)}")
            return False
    
    
    async def get_saved_answers(self) -> List[Dict[str, str]]:
        """
        Get list of all Thoughtspot Saved Answers
        
        Returns:
            List of saved answers with id and name
        """
        if not await self.check_connection():
            raise Exception("Not connected to Thoughtspot")
        
        try:
            url = f"{self.host}/api/rest/2.0/metadata/search"
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            
            payload = {
                "metadata": [{"type": "ANSWER"}]
            }
            
            response = await self.client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            
            # Extract answer IDs and names
            answers = []
            for item in data.get("metadata", []):
                answers.append({
                    "id": item.get("id"),
                    "name": item.get("name"),
                    "description": item.get("description", ""),
                    "created": item.get("created"),
                    "modified": item.get("modified")
                })
            
            return answers
            
        except Exception as e:
            logger.error(f"Failed to fetch saved answers: {str(e)}")
            raise Exception(f"Thoughtspot API error: {str(e)}")
    
    
    async def fetch_saved_answer_data(self, answer_id: str) -> Dict[str, Any]:
        """
        Fetch data from a Thoughtspot Saved Answer
        
        Args:
            answer_id: The Thoughtspot Saved Answer ID
            
        Returns:
            Dictionary with answer data including columns and rows
        """
        if not await self.check_connection():
            raise Exception("Not connected to Thoughtspot")
        
        try:
            url = f"{self.host}/api/rest/2.0/metadata/answer/data"
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            
            payload = {
                "metadata_identifier": answer_id
            }
            
            response = await self.client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            
            # Parse Thoughtspot response format
            columns = [col["name"] for col in data.get("contents", [{}])[0].get("columns", [])]
            rows_data = data.get("contents", [{}])[0].get("data_rows", [])
            
            # Convert to list of dictionaries
            rows = []
            for row in rows_data:
                row_dict = {}
                for idx, value in enumerate(row):
                    if idx < len(columns):
                        row_dict[columns[idx]] = value
                rows.append(row_dict)
            
            return {
                "name": data.get("name", "Unknown"),
                "columns": columns,
                "rows": rows
            }
            
        except Exception as e:
            logger.error(f"Failed to fetch answer data: {str(e)}")
            raise Exception(f"Thoughtspot API error: {str(e)}")
    
    
    async def execute_sql(self, query: str, answer_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Execute SQL query via Thoughtspot SQL Endpoint
        
        Args:
            query: SQL query string
            answer_id: Optional saved answer ID to query against
            
        Returns:
            Query results with columns and rows
        """
        if not await self.check_connection():
            raise Exception("Not connected to Thoughtspot")
        
        try:
            url = f"{self.host}/api/rest/2.0/searchdata"
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            
            payload = {
                "query_string": query,
                "data_format": "COMPACT"
            }
            
            if answer_id:
                payload["logical_table_identifier"] = answer_id
            
            response = await self.client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            
            # Parse response
            columns = [col["name"] for col in data.get("contents", [{}])[0].get("columns", [])]
            rows_data = data.get("contents", [{}])[0].get("data_rows", [])
            
            # Convert to list of dictionaries
            rows = []
            for row in rows_data:
                row_dict = {}
                for idx, value in enumerate(row):
                    if idx < len(columns):
                        row_dict[columns[idx]] = value
                rows.append(row_dict)
            
            return {
                "columns": columns,
                "rows": rows
            }
            
        except Exception as e:
            logger.error(f"SQL execution failed: {str(e)}")
            raise Exception(f"Thoughtspot SQL error: {str(e)}")
    
    
    async def get_incidents(self, status: Optional[str] = None, severity: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Get incidents from Thoughtspot (for Incident Selector)
        
        This assumes you have a Saved Answer or worksheet for incidents in Thoughtspot
        Replace with your actual answer ID once you have it
        
        Args:
            status: Filter by status
            severity: Filter by severity
            
        Returns:
            List of incidents
        """
        # TODO: Replace with your actual Thoughtspot Saved Answer ID for incidents
        INCIDENTS_ANSWER_ID = os.getenv("THOUGHTSPOT_INCIDENTS_ANSWER_ID")
        
        if not INCIDENTS_ANSWER_ID:
            # Return mock data for POC
            logger.warning("INCIDENTS_ANSWER_ID not configured, returning mock data")
            return self._get_mock_incidents(status, severity)
        
        try:
            # Fetch data from Thoughtspot
            answer_data = await self.fetch_saved_answer_data(INCIDENTS_ANSWER_ID)
            incidents = answer_data.get("rows", [])
            
            # Apply filters
            if status:
                incidents = [i for i in incidents if i.get("status", "").lower() == status.lower()]
            
            if severity:
                incidents = [i for i in incidents if i.get("severity", "").lower() == severity.lower()]
            
            return incidents
            
        except Exception as e:
            logger.error(f"Failed to fetch incidents: {str(e)}")
            raise Exception(f"Incidents fetch error: {str(e)}")
    
    
    async def get_incident_by_id(self, incident_id: str) -> Optional[Dict[str, Any]]:
        """
        Get specific incident by ID
        
        Args:
            incident_id: Incident identifier
            
        Returns:
            Incident details or None
        """
        try:
            incidents = await self.get_incidents()
            for incident in incidents:
                if str(incident.get("incident_id")) == str(incident_id):
                    return incident
            return None
        except Exception as e:
            logger.error(f"Failed to fetch incident {incident_id}: {str(e)}")
            return None
    
    
    def _get_mock_incidents(self, status: Optional[str] = None, severity: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Mock incidents data for POC testing
        Remove this once real Thoughtspot integration is ready
        """
        mock_data = [
            {
                "incident_id": "INC-001",
                "title": "Phase 2 Trial Delay - MRTX-001",
                "status": "open",
                "severity": "high",
                "created_at": "2026-02-10T10:30:00Z",
                "updated_at": "2026-02-20T15:45:00Z",
                "description": "Patient recruitment below target"
            },
            {
                "incident_id": "INC-002",
                "title": "Budget Overrun - Manufacturing Scale-up",
                "status": "in-progress",
                "severity": "critical",
                "created_at": "2026-02-12T09:00:00Z",
                "updated_at": "2026-02-22T11:20:00Z",
                "description": "Cost exceeded by 25%"
            },
            {
                "incident_id": "INC-003",
                "title": "Regulatory Filing Submission Delay",
                "status": "closed",
                "severity": "medium",
                "created_at": "2026-01-15T14:20:00Z",
                "updated_at": "2026-02-18T16:30:00Z",
                "description": "Documentation complete, submitted"
            },
            {
                "incident_id": "INC-004",
                "title": "Data Quality Issue - Clinical Site #5",
                "status": "open",
                "severity": "low",
                "created_at": "2026-02-18T11:15:00Z",
                "updated_at": "2026-02-23T09:00:00Z",
                "description": "Missing patient consent forms"
            }
        ]
        
        # Apply filters
        filtered = mock_data
        if status:
            filtered = [i for i in filtered if i["status"].lower() == status.lower()]
        if severity:
            filtered = [i for i in filtered if i["severity"].lower() == severity.lower()]
        
        return filtered
    
    
    async def close(self):
        """Close HTTP client connections"""
        await self.client.aclose()
