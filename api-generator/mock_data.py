"""
Mock data for POC testing - No Thoughtspot required
"""

from typing import List, Dict, Any


def get_mock_saved_answers() -> List[Dict[str, str]]:
    """Mock Thoughtspot Saved Answers - includes real IPE Forecast Summary from user"""
    return [
        {
            "id": "ipe-forecast-summary",
            "name": "IPE Forecast Summary",
            "description": "Real TS Saved Answer – clinical study, plan state, year, project, IPE forecast cost (from your SQL)",
            "created": "2026-02-01",
            "modified": "2026-02-26"
        },
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
        },
        "ipe-forecast-summary": {
            "name": "IPE Forecast Summary",
            "columns": [
                "clinical_study_key", "Plan State", "Year", "Plan Version Number", "Project Alternate ID",
                "clinical_study_name_full_title", "Project ID and Short Description", "Plan Type Name",
                "activity_workpackage_code", "Role Level 4", "Role Level 5", "Role Level 6", "ipe_forecast_cost_planning"
            ],
            "rows": [
                {
                    "clinical_study_key": "CS-2024-001",
                    "Plan State": "Approved",
                    "Year": 2025,
                    "Plan Version Number": 3,
                    "Project Alternate ID": "PA-001",
                    "clinical_study_name_full_title": "Phase II Trial MRTX-001",
                    "Project ID and Short Description": "MRTX-001 / Oncology Phase II",
                    "Plan Type Name": "Forecast",
                    "activity_workpackage_code": "WP-CLIN-01",
                    "Role Level 4": "Clinical",
                    "Role Level 5": "Trial Management",
                    "Role Level 6": "Site Monitoring",
                    "ipe_forecast_cost_planning": 1250000.50
                },
                {
                    "clinical_study_key": "CS-2024-002",
                    "Plan State": "Draft",
                    "Year": 2026,
                    "Plan Version Number": 1,
                    "Project Alternate ID": "PA-002",
                    "clinical_study_name_full_title": "Phase III Trial MRTX-002",
                    "Project ID and Short Description": "MRTX-002 / Cardiovascular",
                    "Plan Type Name": "Planning",
                    "activity_workpackage_code": "WP-CMC-02",
                    "Role Level 4": "CMC",
                    "Role Level 5": "Manufacturing",
                    "Role Level 6": "Scale-up",
                    "ipe_forecast_cost_planning": 2800000.00
                },
                {
                    "clinical_study_key": "CS-2024-003",
                    "Plan State": "Approved",
                    "Year": 2025,
                    "Plan Version Number": 2,
                    "Project Alternate ID": "PA-003",
                    "clinical_study_name_full_title": "Phase I First-in-Human",
                    "Project ID and Short Description": "MRTX-003 / FIH Study",
                    "Plan Type Name": "Forecast",
                    "activity_workpackage_code": "WP-CLIN-02",
                    "Role Level 4": "Clinical",
                    "Role Level 5": "Safety",
                    "Role Level 6": "Pharmacovigilance",
                    "ipe_forecast_cost_planning": 850000.25
                },
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


# ==================== API Mapper (TS Answer → Schema → Generate) ====================

def get_api_mapper_schema(answer_id: str) -> List[Dict[str, Any]]:
    """
    Returns API Mapper table rows for a TS Answer.
    Each row: Clause, Field, Data Type, Default Value List, Response Field Name,
    Is required in Response, User Input Required.
    """
    # Predefined schema per answer (Select vs Where, field names, types)
    schemas = {
        "answer-001": [
            {"clause": "Select", "field": "Date Key", "data_type": "date", "default_value_list": "", "response_field_name": "DateID", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Plan Key", "data_type": "string", "default_value_list": "", "response_field_name": "", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Month", "data_type": "string", "default_value_list": "", "response_field_name": "Month", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Project", "data_type": "string", "default_value_list": "", "response_field_name": "Project", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Status", "data_type": "string", "default_value_list": "", "response_field_name": "Status", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Health_Score", "data_type": "number", "default_value_list": "", "response_field_name": "HealthScore", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Where", "field": "project_key", "data_type": "string", "default_value_list": "", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "Y"},
            {"clause": "Where", "field": "date_key", "data_type": "date", "default_value_list": "", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "N"},
        ],
        "answer-002": [
            {"clause": "Select", "field": "Trial_ID", "data_type": "string", "default_value_list": "", "response_field_name": "TrialID", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Milestone", "data_type": "string", "default_value_list": "", "response_field_name": "Milestone", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Planned_Date", "data_type": "date", "default_value_list": "", "response_field_name": "PlannedDate", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Actual_Date", "data_type": "date", "default_value_list": "", "response_field_name": "ActualDate", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Status", "data_type": "string", "default_value_list": "", "response_field_name": "Status", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Where", "field": "trial_id", "data_type": "string", "default_value_list": "", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "Y"},
        ],
        "answer-003": [
            {"clause": "Select", "field": "Project", "data_type": "string", "default_value_list": "", "response_field_name": "Project", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Budget", "data_type": "number", "default_value_list": "", "response_field_name": "Budget", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Actual_Spend", "data_type": "number", "default_value_list": "", "response_field_name": "ActualSpend", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Variance", "data_type": "number", "default_value_list": "", "response_field_name": "Variance", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Where", "field": "project_key", "data_type": "string", "default_value_list": "", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "Y"},
        ],
        "answer-004": [
            {"clause": "Select", "field": "Risk_ID", "data_type": "string", "default_value_list": "", "response_field_name": "RiskID", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Project", "data_type": "string", "default_value_list": "", "response_field_name": "Project", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Risk_Description", "data_type": "string", "default_value_list": "", "response_field_name": "Description", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Severity", "data_type": "string", "default_value_list": "", "response_field_name": "Severity", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Where", "field": "severity_filter", "data_type": "string", "default_value_list": "High,Medium,Low", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "Y"},
        ],
        # Real TS Saved Answer from user: IPE Forecast Summary (metadata_id da0110cd-9e00-4bb1-8f17-e936c6838b35)
        "ipe-forecast-summary": [
            {"clause": "Select", "field": "clinical_study_key", "data_type": "string", "default_value_list": "", "response_field_name": "clinical_study_key", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Plan State", "data_type": "string", "default_value_list": "", "response_field_name": "plan_state", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Year", "data_type": "integer", "default_value_list": "", "response_field_name": "year", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Plan Version Number", "data_type": "integer", "default_value_list": "", "response_field_name": "plan_version_number", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Project Alternate ID", "data_type": "string", "default_value_list": "", "response_field_name": "project_alternate_id", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "clinical_study_name_full_title", "data_type": "string", "default_value_list": "", "response_field_name": "clinical_study_name", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Select", "field": "Project ID and Short Description", "data_type": "string", "default_value_list": "", "response_field_name": "project_description", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Plan Type Name", "data_type": "string", "default_value_list": "", "response_field_name": "plan_type_name", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "activity_workpackage_code", "data_type": "string", "default_value_list": "", "response_field_name": "workpackage_code", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Role Level 4", "data_type": "string", "default_value_list": "", "response_field_name": "role_level_4", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Role Level 5", "data_type": "string", "default_value_list": "", "response_field_name": "role_level_5", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "Role Level 6", "data_type": "string", "default_value_list": "", "response_field_name": "role_level_6", "is_required_in_response": "N", "user_input_required": "NA"},
            {"clause": "Select", "field": "ipe_forecast_cost_planning", "data_type": "number", "default_value_list": "", "response_field_name": "ipe_forecast_cost", "is_required_in_response": "Y", "user_input_required": "NA"},
            {"clause": "Where", "field": "Year", "data_type": "integer", "default_value_list": "2021,2028", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "Y"},
            {"clause": "Where", "field": "latest_snapshot_flag", "data_type": "boolean", "default_value_list": "FALSE", "response_field_name": "", "is_required_in_response": "NA", "user_input_required": "N"},
        ],
    }
    return schemas.get(answer_id, schemas["answer-001"])


def _safe_sql_id(name: str) -> str:
    """Quote and sanitize for SQL identifier."""
    return name.replace(" ", "_").replace("-", "_")


def generate_api_sql_artifacts(answer_id: str, mapper_rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    From API Mapper configuration, generate SQL View, Sample Data, and API SQL Code Template.
    Uses response_field_name for SELECT output and builds WHERE from user_input_required params.
    """
    def _alias(rr: Dict[str, Any]) -> str:
        return (rr.get("response_field_name") or "").strip() or (rr.get("field") or "")

    answer_data = get_mock_saved_answer_data(answer_id)
    select_fields = [r for r in mapper_rows if (r.get("clause") or "").strip() == "Select"]
    where_fields = [r for r in mapper_rows if (r.get("clause") or "").strip() == "Where"]

    # Only Y (required) fields appear in SQL, Sample Data, and Template. N (omit) fields are excluded.
    select_fields_required = [r for r in select_fields if (r.get("is_required_in_response") or "").strip().upper() == "Y"]
    select_fields_omit = [r for r in select_fields if (r.get("is_required_in_response") or "").strip().upper() == "N"]
    required_resp = [_alias(r) for r in select_fields_required]
    optional_resp = [_alias(r) for r in select_fields_omit]

    # SELECT: only required (Y) fields
    select_parts = []
    for r in select_fields_required:
        src = (r.get("field") or "").strip()
        alias = _alias(r) or _safe_sql_id(src)
        select_parts.append(f'  "{src}" AS {alias}')
    select_clause = ",\n".join(select_parts) if select_parts else "  -- (no required fields)"

    # WHERE: (1) From Where clause rows (user_input_required Y = API param)
    where_parts = []
    for r in where_fields:
        field = r.get("field", "")
        param = _safe_sql_id(field)
        default = (r.get("default_value_list") or "").strip()
        if field == "Year" and "," in default:
            parts = [p.strip() for p in default.split(",")]
            if len(parts) >= 2:
                where_parts.append(f'  "{field}" >= :year_min AND "{field}" <= :year_max')
            else:
                where_parts.append(f'  "{field}" = :{param}')
        elif field == "latest_snapshot_flag":
            where_parts.append(f'  "{field}" = :latest_snapshot_flag')
        else:
            where_parts.append(f'  "{field}" = :{param}')
    # (2) Select rows with User Input Required = Y become filter params (e.g. filter by clinical_study_key)
    for r in select_fields:
        if (r.get("user_input_required") or "").strip().upper() != "Y":
            continue
        field = (r.get("field") or "").strip()
        param = _alias(r) or _safe_sql_id(field)
        where_parts.append(f'  "{field}" = :{param}')
    where_clause = " AND\n".join(where_parts) if where_parts else "  1=1"

    sql_view = f"""-- SQL View for Saved Answer: {answer_id}
CREATE OR REPLACE VIEW api_mapper_view AS
SELECT
{select_clause}
FROM thoughtspot_answer
WHERE
{where_clause};
"""

    # Default Value List: when set, filter Sample Data to rows matching that default (so sample shows "if you use this default, you get this")
    def _apply_default_filters(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        filtered = rows
        for r in where_fields + select_fields:
            default = (r.get("default_value_list") or "").strip()
            if not default:
                continue
            field = (r.get("field") or "").strip()
            if not field:
                continue
            # Only filter when the row has this field (mock data may not have all Where keys)
            if field == "Year" and "," in default:
                parts = [p.strip() for p in default.split(",")]
                if len(parts) >= 2:
                    try:
                        ymin, ymax = int(parts[0]), int(parts[1])
                        filtered = [row for row in filtered if field not in row or (row.get("Year") is not None and ymin <= row["Year"] <= ymax)]
                    except (ValueError, TypeError):
                        pass
                continue
            if field == "latest_snapshot_flag":
                try:
                    val = default.upper() == "TRUE"
                    filtered = [row for row in filtered if field not in row or (row.get(field) is not None and row[field] == val)]
                except (ValueError, TypeError):
                    pass
                continue
            # Single value default (e.g. clinical_study_key = CS-2024-001): keep only rows where field matches default
            filtered = [row for row in filtered if field not in row or (row.get(field) is not None and str(row[field]).strip() == default)]
        return filtered

    # Sample Data: only required (Y) columns; apply Default Value List as filter so sample matches defaults
    col_resp = required_resp.copy()
    field_to_resp = {r.get("field"): _alias(r) for r in select_fields_required}
    rows_raw = answer_data.get("rows", [])[:20]
    rows_filtered = _apply_default_filters(rows_raw)
    rows_mapped = []
    for row in rows_filtered:
        mapped = {}
        for k, v in row.items():
            resp_name = field_to_resp.get(k)
            if resp_name is not None:
                mapped[resp_name] = v
        rows_mapped.append(mapped)

    sample_data = {"columns": col_resp, "rows": rows_mapped}

    user_params = []
    for r in where_fields:
        if (r.get("user_input_required") or "").strip().upper() != "Y":
            continue
        field = r.get("field", "")
        if field == "Year" and "," in (r.get("default_value_list") or ""):
            user_params.extend(["year_min", "year_max"])
        else:
            user_params.append(_safe_sql_id(field))
    for r in select_fields:
        if (r.get("user_input_required") or "").strip().upper() == "Y":
            user_params.append(_alias(r) or _safe_sql_id(r.get("field", "")))

    required_line = ", ".join(required_resp) if required_resp else "(none)"
    optional_line = ", ".join(optional_resp) if optional_resp else "(none)"

    api_sql_code_template = f"""-- API SQL Code Template
-- Generated from API Mapper for: {answer_id}
-- When API is called with params (e.g. year_min=2021, year_max=2028), backend runs this SQL and returns JSON.

-- Response contract (from "Is required in Response" column)
-- Required response fields (must appear in every JSON row): {required_line}
-- Response fields to omit (N): {optional_line}

-- Query template (GET)
SELECT
{select_clause}
FROM thoughtspot_answer
WHERE
{where_clause};

-- User input params (API query/path): {", ".join(user_params) if user_params else "none"}
"""

    return {
        "sql_view": sql_view.strip(),
        "sample_data": sample_data,
        "api_sql_code_template": api_sql_code_template.strip(),
        "response_contract": {"required": required_resp, "optional": optional_resp},
        "user_params": user_params,
        "used_config": {
            "required_fields": required_resp,
            "optional_fields": optional_resp,
            "user_params": user_params,
            "response_columns": col_resp,
        },
    }


def run_answer_api(answer_id: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run the API for a saved answer: filter mock data by query params and return JSON.
    Used by GET /api/v1/run/{answer_id}?year_min=2024&year_max=2026&clinical_study_key=...
    """
    mapper_rows = get_api_mapper_schema(answer_id)
    answer_data = get_mock_saved_answer_data(answer_id)
    select_fields = [r for r in mapper_rows if r.get("clause") == "Select"]
    col_resp = [r.get("response_field_name") or r.get("field") for r in select_fields]
    field_to_resp = {r.get("field"): (r.get("response_field_name") or r.get("field")) for r in select_fields}
    rows_raw = answer_data.get("rows", [])
    rows_mapped = []
    for row in rows_raw:
        mapped = {}
        for k, v in row.items():
            resp_name = field_to_resp.get(k, k)
            mapped[resp_name] = v
        rows_mapped.append(mapped)

    # Filter by provided params (response field names: year_min, year_max, clinical_study_key, etc.)
    for key, value in list(params.items()):
        if value is None or value == "":
            continue
        if key == "year_min":
            try:
                v = int(value)
                rows_mapped = [r for r in rows_mapped if r.get("year") is not None and r["year"] >= v]
            except (ValueError, TypeError):
                pass
        elif key == "year_max":
            try:
                v = int(value)
                rows_mapped = [r for r in rows_mapped if r.get("year") is not None and r["year"] <= v]
            except (ValueError, TypeError):
                pass
        elif key in col_resp:
            rows_mapped = [r for r in rows_mapped if str(r.get(key)) == str(value)]
    return {"columns": col_resp, "rows": rows_mapped}
