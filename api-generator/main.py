"""
BE API Generator - FastAPI Backend
Connects Thoughtspot Saved Answers to Frontend UI
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv

from services.thoughtspot_service import ThoughtspotService

# Load environment variables
load_dotenv()

app = FastAPI(
    title="BE API Generator",
    description="Backend API to fetch Thoughtspot data and serve to Frontend",
    version="1.0.0"
)

# CORS Configuration - Allow Frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://pct-dashboard-xi.vercel.app",
        "https://nikhil12121.github.io",
        "*"  # For development - restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Thoughtspot service
thoughtspot_service = ThoughtspotService(
    host=os.getenv("THOUGHTSPOT_HOST"),
    username=os.getenv("THOUGHTSPOT_USERNAME"),
    password=os.getenv("THOUGHTSPOT_PASSWORD"),
)


# ==================== Response Models ====================

class HealthResponse(BaseModel):
    status: str
    service: str
    thoughtspot_connected: bool


class SavedAnswerResponse(BaseModel):
    answer_id: str
    name: str
    data: List[Dict[str, Any]]
    columns: List[str]
    row_count: int


class IncidentData(BaseModel):
    incident_id: str
    title: str
    status: str
    severity: str
    created_at: str
    updated_at: str


# ==================== API Endpoints ====================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "BE API Generator - Running",
        "status": "healthy",
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint
    Returns API status and Thoughtspot connection status
    """
    ts_connected = await thoughtspot_service.check_connection()
    
    return HealthResponse(
        status="healthy" if ts_connected else "degraded",
        service="BE API Generator",
        thoughtspot_connected=ts_connected
    )


@app.get("/api/v1/saved-answers", tags=["Thoughtspot"])
async def get_saved_answers():
    """
    Get list of all available Thoughtspot Saved Answers
    
    Returns:
        List of saved answer IDs and names
    """
    try:
        answers = await thoughtspot_service.get_saved_answers()
        return {
            "status": "success",
            "data": answers,
            "count": len(answers)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch saved answers: {str(e)}")


@app.get("/api/v1/saved-answers/{answer_id}", response_model=SavedAnswerResponse, tags=["Thoughtspot"])
async def get_saved_answer_data(answer_id: str):
    """
    Get data from a specific Thoughtspot Saved Answer
    
    Args:
        answer_id: The Thoughtspot Saved Answer ID
        
    Returns:
        Data from the saved answer with columns and rows
    """
    try:
        data = await thoughtspot_service.fetch_saved_answer_data(answer_id)
        
        return SavedAnswerResponse(
            answer_id=answer_id,
            name=data.get("name", "Unknown"),
            data=data.get("rows", []),
            columns=data.get("columns", []),
            row_count=len(data.get("rows", []))
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data: {str(e)}")


@app.get("/api/v1/sql-endpoint", tags=["Thoughtspot"])
async def execute_sql_query(
    query: str = Query(..., description="SQL query to execute"),
    answer_id: Optional[str] = Query(None, description="Optional: Saved Answer ID")
):
    """
    Execute SQL query via Thoughtspot SQL Endpoint
    
    Args:
        query: SQL query string
        answer_id: Optional saved answer ID to query against
        
    Returns:
        Query results
    """
    try:
        result = await thoughtspot_service.execute_sql(query, answer_id)
        return {
            "status": "success",
            "query": query,
            "data": result.get("rows", []),
            "columns": result.get("columns", []),
            "row_count": len(result.get("rows", []))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SQL execution failed: {str(e)}")


@app.get("/api/v1/incidents", tags=["Incidents"])
async def get_incidents(
    status: Optional[str] = Query(None, description="Filter by status (open, closed, in-progress)"),
    severity: Optional[str] = Query(None, description="Filter by severity (low, medium, high, critical)")
):
    """
    Get incidents data from Thoughtspot
    This endpoint is for incident selector functionality
    
    Args:
        status: Filter by incident status
        severity: Filter by severity level
        
    Returns:
        List of incidents
    """
    try:
        incidents = await thoughtspot_service.get_incidents(status, severity)
        return {
            "status": "success",
            "data": incidents,
            "count": len(incidents),
            "filters": {
                "status": status,
                "severity": severity
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch incidents: {str(e)}")


@app.get("/api/v1/incidents/{incident_id}", tags=["Incidents"])
async def get_incident_details(incident_id: str):
    """
    Get detailed information for a specific incident
    
    Args:
        incident_id: The incident identifier
        
    Returns:
        Incident details
    """
    try:
        incident = await thoughtspot_service.get_incident_by_id(incident_id)
        if not incident:
            raise HTTPException(status_code=404, detail="Incident not found")
        
        return {
            "status": "success",
            "data": incident
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch incident: {str(e)}")


@app.get("/api/v1/status", tags=["Status"])
async def get_api_status():
    """
    Get overall API status including:
    - API health
    - Thoughtspot connection status
    - Available endpoints
    - Request statistics
    """
    ts_status = await thoughtspot_service.check_connection()
    
    return {
        "api_status": "running",
        "thoughtspot_status": "connected" if ts_status else "disconnected",
        "endpoints": {
            "saved_answers": "/api/v1/saved-answers",
            "sql_endpoint": "/api/v1/sql-endpoint",
            "incidents": "/api/v1/incidents",
        },
        "version": "1.0.0"
    }


# ==================== Error Handlers ====================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "status": "error",
        "message": exc.detail,
        "status_code": exc.status_code
    }


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {
        "status": "error",
        "message": "Internal server error",
        "detail": str(exc)
    }


# ==================== Startup/Shutdown ====================

@app.on_event("startup")
async def startup_event():
    """Initialize connections on startup"""
    print("🚀 BE API Generator starting...")
    print(f"📊 Thoughtspot Host: {os.getenv('THOUGHTSPOT_HOST', 'Not configured')}")
    
    # Test Thoughtspot connection
    connected = await thoughtspot_service.check_connection()
    if connected:
        print("✅ Thoughtspot connected successfully")
    else:
        print("⚠️  Thoughtspot connection failed - check credentials")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("👋 BE API Generator shutting down...")
    await thoughtspot_service.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )
