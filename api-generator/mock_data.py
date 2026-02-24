"""
Mock data for POC testing - No Thoughtspot required
"""

from typing import List, Dict, Any


def get_mock_saved_answers() -> List[Dict[str, str]]:
    """Mock Thoughtspot Saved Answers"""
    return [
        {
            "id": "answer-001",
            "name": "Monthly Pipeline Health Report",
            "description": "Pipeline status and KPIs by month",
            "created": "2026-01-15",
            "modified": "2026-02-20"
        },
        {
            "id": "answer-002",
            "name": "Clinical Trial Milestones",
            "description": "Trial milestones and completion status",
            "created": "2026-01-20",
            "modified": "2026-02-18"
        },
        {
            "id": "answer-003",
            "name": "Budget vs Actuals Analysis",
            "description": "Financial performance by project",
            "created": "2026-02-01",
            "modified": "2026-02-22"
        },
        {
            "id": "answer-004",
            "name": "Risk Register - Active Risks",
            "description": "All active risks across portfolio",
            "created": "2026-02-05",
            "modified": "2026-02-23"
        }
    ]


def get_mock_saved_answer_data(answer_id: str) -> Dict[str, Any]:
    """Mock data for a specific Saved Answer"""
    
    # Different mock data based on answer_id
    mock_datasets = {
        "answer-001": {
            "name": "Monthly Pipeline Health Report",
            "columns": ["Month", "Project", "Status", "Health_Score", "Budget_USD"],
            "rows": [
                {"Month": "Jan 2026", "Project": "MRTX-001", "Status": "On Track", "Health_Score": 85, "Budget_USD": 5000000},
                {"Month": "Jan 2026", "Project": "MRTX-002", "Status": "At Risk", "Health_Score": 65, "Budget_USD": 7500000},
                {"Month": "Feb 2026", "Project": "MRTX-001", "Status": "On Track", "Health_Score": 88, "Budget_USD": 5200000},
                {"Month": "Feb 2026", "Project": "MRTX-002", "Status": "Delayed", "Health_Score": 60, "Budget_USD": 8000000},
            ]
        },
        "answer-002": {
            "name": "Clinical Trial Milestones",
            "columns": ["Trial_ID", "Milestone", "Planned_Date", "Actual_Date", "Status"],
            "rows": [
                {"Trial_ID": "MRTX-001-P2", "Milestone": "First Patient In", "Planned_Date": "2026-01-15", "Actual_Date": "2026-01-15", "Status": "Complete"},
                {"Trial_ID": "MRTX-001-P2", "Milestone": "50% Enrollment", "Planned_Date": "2026-03-01", "Actual_Date": None, "Status": "In Progress"},
                {"Trial_ID": "MRTX-002-P3", "Milestone": "Database Lock", "Planned_Date": "2026-02-10", "Actual_Date": "2026-02-25", "Status": "Delayed"},
            ]
        },
        "answer-003": {
            "name": "Budget vs Actuals Analysis",
            "columns": ["Project", "Budget", "Actual_Spend", "Variance", "Variance_Percent"],
            "rows": [
                {"Project": "MRTX-001", "Budget": 5000000, "Actual_Spend": 4800000, "Variance": -200000, "Variance_Percent": -4.0},
                {"Project": "MRTX-002", "Budget": 7500000, "Actual_Spend": 8000000, "Variance": 500000, "Variance_Percent": 6.7},
                {"Project": "MRTX-003", "Budget": 3000000, "Actual_Spend": 2900000, "Variance": -100000, "Variance_Percent": -3.3},
            ]
        },
        "answer-004": {
            "name": "Risk Register - Active Risks",
            "columns": ["Risk_ID", "Project", "Risk_Description", "Severity", "Probability", "Mitigation"],
            "rows": [
                {"Risk_ID": "R-001", "Project": "MRTX-001", "Risk_Description": "Patient recruitment slow", "Severity": "High", "Probability": "70%", "Mitigation": "Add 3 new sites"},
                {"Risk_ID": "R-002", "Project": "MRTX-002", "Risk_Description": "Budget overrun risk", "Severity": "Critical", "Probability": "85%", "Mitigation": "Review spend weekly"},
                {"Risk_ID": "R-003", "Project": "MRTX-003", "Risk_Description": "Regulatory delay", "Severity": "Medium", "Probability": "40%", "Mitigation": "Early FDA engagement"},
            ]
        }
    }
    
    # Return specific dataset or default
    return mock_datasets.get(answer_id, {
        "name": "Unknown Saved Answer",
        "columns": ["Column1", "Column2", "Column3"],
        "rows": [
            {"Column1": "Sample", "Column2": "Data", "Column3": "Here"}
        ]
    })


def get_mock_incidents(status: str = None, severity: str = None) -> List[Dict[str, Any]]:
    """Mock incidents for POC testing"""
    
    all_incidents = [
        {
            "incident_id": "INC-001",
            "title": "Phase 2 Trial Delay - MRTX-001",
            "status": "open",
            "severity": "high",
            "project": "MRTX-001",
            "created_at": "2026-02-10T10:30:00Z",
            "updated_at": "2026-02-20T15:45:00Z",
            "description": "Patient recruitment below target by 30%",
            "owner": "Clinical Operations",
            "impact": "3-month timeline delay"
        },
        {
            "incident_id": "INC-002",
            "title": "Budget Overrun - Manufacturing Scale-up",
            "status": "in-progress",
            "severity": "critical",
            "project": "MRTX-002",
            "created_at": "2026-02-12T09:00:00Z",
            "updated_at": "2026-02-22T11:20:00Z",
            "description": "Manufacturing cost exceeded by 25%, $1.5M over budget",
            "owner": "CMC Team",
            "impact": "$1.5M budget increase needed"
        },
        {
            "incident_id": "INC-003",
            "title": "Regulatory Filing Submission Delay",
            "status": "closed",
            "severity": "medium",
            "project": "MRTX-003",
            "created_at": "2026-01-15T14:20:00Z",
            "updated_at": "2026-02-18T16:30:00Z",
            "description": "IND filing delayed due to CMC documentation gaps",
            "owner": "Regulatory Affairs",
            "impact": "2-week delay, resolved"
        },
        {
            "incident_id": "INC-004",
            "title": "Data Quality Issue - Clinical Site #5",
            "status": "open",
            "severity": "low",
            "project": "MRTX-001",
            "created_at": "2026-02-18T11:15:00Z",
            "updated_at": "2026-02-23T09:00:00Z",
            "description": "Missing patient consent forms for 5 patients",
            "owner": "Data Management",
            "impact": "Minor data quality impact"
        },
        {
            "incident_id": "INC-005",
            "title": "Supply Chain Disruption - API Shortage",
            "status": "in-progress",
            "severity": "high",
            "project": "MRTX-002",
            "created_at": "2026-02-15T08:00:00Z",
            "updated_at": "2026-02-23T14:30:00Z",
            "description": "Key API supplier unable to deliver on time",
            "owner": "Supply Chain",
            "impact": "4-week production delay possible"
        },
        {
            "incident_id": "INC-006",
            "title": "Protocol Amendment Required - Safety Signal",
            "status": "open",
            "severity": "critical",
            "project": "MRTX-001",
            "created_at": "2026-02-20T16:45:00Z",
            "updated_at": "2026-02-23T10:00:00Z",
            "description": "Unexpected safety signal requires protocol modification",
            "owner": "Clinical Safety",
            "impact": "Trial on hold pending amendment approval"
        },
        {
            "incident_id": "INC-007",
            "title": "CRO Performance Issue",
            "status": "closed",
            "severity": "medium",
            "project": "MRTX-003",
            "created_at": "2026-01-10T09:30:00Z",
            "updated_at": "2026-02-05T11:00:00Z",
            "description": "CRO monitoring reports delayed, escalated and resolved",
            "owner": "Clinical Operations",
            "impact": "Resolved - new CRO engaged"
        },
        {
            "incident_id": "INC-008",
            "title": "IT System Downtime - CTMS",
            "status": "closed",
            "severity": "low",
            "project": "All Projects",
            "created_at": "2026-02-08T12:00:00Z",
            "updated_at": "2026-02-08T15:00:00Z",
            "description": "Clinical Trial Management System down for 3 hours",
            "owner": "IT Operations",
            "impact": "Temporary - no data loss"
        }
    ]
    
    # Apply filters
    filtered = all_incidents
    if status:
        filtered = [i for i in filtered if i["status"].lower() == status.lower()]
    if severity:
        filtered = [i for i in filtered if i["severity"].lower() == severity.lower()]
    
    return filtered


def get_mock_sql_result(query: str) -> Dict[str, Any]:
    """Mock SQL query execution result"""
    return {
        "columns": ["incident_id", "title", "status", "severity", "project"],
        "rows": [
            {"incident_id": "INC-001", "title": "Phase 2 Trial Delay", "status": "open", "severity": "high", "project": "MRTX-001"},
            {"incident_id": "INC-002", "title": "Budget Overrun", "status": "in-progress", "severity": "critical", "project": "MRTX-002"},
        ]
    }
