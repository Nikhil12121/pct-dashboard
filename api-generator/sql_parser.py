"""
Parse Thoughtspot Saved Answer SQL to extract SELECT columns and WHERE parameters.
Used to populate API Mapper from real TS answer format:
  {"metadata_id":"...", "metadata_name":"...", "sql_queries":[{"sql_query":"SELECT ... WHERE ..."}]}
"""

import re
from typing import List, Dict, Any, Tuple


def parse_thoughtspot_sql(sql: str) -> Tuple[List[str], List[str]]:
    """
    Parse SQL string to extract:
    - select_columns: list of column names/aliases from SELECT clause
    - where_params: list of parameter/field names from WHERE clause (for API params)

    Handles typical Thoughtspot-style SQL with quoted identifiers.
    """
    if not sql or not sql.strip():
        return [], []

    # Normalize: remove comment lines (/* ... */ and -- ...)
    sql = re.sub(r'/\*.*?\*/', ' ', sql, flags=re.DOTALL)
    sql = re.sub(r'--[^\n]*', '\n', sql)
    sql = ' '.join(sql.split())

    select_columns: List[str] = []
    where_params: List[str] = []

    # Extract SELECT ... FROM part
    match_select = re.search(r'\bSELECT\b(.*?)\bFROM\b', sql, re.IGNORECASE | re.DOTALL)
    if match_select:
        select_block = match_select.group(1).strip()
        # Split by comma, but avoid splitting inside parentheses
        parts = _split_top_level(select_block, ',')
        for part in parts:
            part = part.strip()
            if not part:
                continue
            # Look for quoted alias: "ca_1" or "Date Key" or "Plan State"
            # Prefer last quoted string (alias); else first
            quoted = re.findall(r'"([^"]+)"', part)
            if quoted:
                # Use last quoted as column name (often the alias)
                name = quoted[-1].strip()
                if name and name not in select_columns:
                    select_columns.append(name)

    # Extract WHERE ... (until GROUP BY / ORDER BY / end)
    match_where = re.search(r'\bWHERE\b\s*\((.*?)(?=\bGROUP\s+BY\b|\bORDER\s+BY\b|$)', sql, re.IGNORECASE | re.DOTALL)
    if match_where:
        where_block = match_where.group(1).strip()
        # Prefer "ta_N"."column_name" -> column_name; skip table aliases like ta_3, ta_8
        for m in re.finditer(r'"ta_\d+"\s*\.\s*"([^"]+)"', where_block):
            name = m.group(1).strip()
            if name.upper() not in ('TRUE', 'FALSE', 'NULL') and name not in where_params:
                where_params.append(name)
        # If none found, fall back to any quoted identifier (excluding ta_N and reserved)
        if not where_params:
            for m in re.finditer(r'"([a-zA-Z_][a-zA-Z0-9_]*)"', where_block):
                name = m.group(1)
                if re.match(r'^ta_\d+$', name):
                    continue
                if name.upper() not in ('TRUE', 'FALSE', 'NULL') and name not in where_params:
                    where_params.append(name)

    return select_columns, where_params


def _split_top_level(s: str, sep: str) -> List[str]:
    """Split by sep only at top level (not inside parentheses)."""
    parts = []
    depth = 0
    start = 0
    for i, c in enumerate(s):
        if c in '([{':
            depth += 1
        elif c in ')]}':
            depth -= 1
        elif c == sep and depth == 0:
            parts.append(s[start:i].strip())
            start = i + 1
    parts.append(s[start:].strip())
    return parts


def schema_from_parsed_sql(
    select_columns: List[str],
    where_params: List[str],
    metadata_name: str = "",
) -> List[Dict[str, Any]]:
    """
    Build API Mapper schema rows from parsed SELECT and WHERE.
    - Select: each column -> row with is_required_in_response=Y, user_input_required=NA
    - Where: each param -> row with is_required_in_response=NA, user_input_required=Y (param from frontend)
    """
    rows: List[Dict[str, Any]] = []

    for col in select_columns:
        rows.append({
            "clause": "Select",
            "field": col,
            "data_type": "string",
            "default_value_list": "",
            "response_field_name": col,
            "is_required_in_response": "Y",
            "user_input_required": "NA",
        })

    for param in where_params:
        rows.append({
            "clause": "Where",
            "field": param,
            "data_type": "string",
            "default_value_list": "",
            "response_field_name": "",
            "is_required_in_response": "NA",
            "user_input_required": "Y",
        })

    return rows


def parse_thoughtspot_answer(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Accept Thoughtspot Saved Answer payload:
      {
        "metadata_id": "da0110cd-9e00-4bb1-8f17-e936c6838b35",
        "metadata_name": "IPE Forecast Summary",
        "metadata_type": "ANSWER",
        "sql_queries": [{ "metadata_id": "...", "metadata_name": "...", "sql_query": "SELECT ... WHERE ..." }]
      }

    Returns:
      {
        "metadata_id": "...",
        "metadata_name": "...",
        "schema": [ ... API Mapper rows ... ],
        "sql_query": "SELECT ...",
        "select_columns": [...],
        "where_params": [...]
      }
    """
    metadata_id = payload.get("metadata_id", "")
    metadata_name = payload.get("metadata_name", "Unknown Answer")
    sql_queries = payload.get("sql_queries") or []
    sql_query = ""
    if sql_queries and isinstance(sql_queries[0], dict):
        sql_query = (sql_queries[0].get("sql_query") or "").strip()

    select_columns: List[str] = []
    where_params: List[str] = []

    if sql_query:
        select_columns, where_params = parse_thoughtspot_sql(sql_query)

    # If parsing produced nothing, provide minimal defaults so UI still works
    if not select_columns and not where_params:
        select_columns = ["column_1", "column_2"]
        where_params = ["filter_param"]

    schema = schema_from_parsed_sql(select_columns, where_params, metadata_name)

    return {
        "metadata_id": metadata_id,
        "metadata_name": metadata_name,
        "schema": schema,
        "sql_query": sql_query[:2000] if sql_query else "",  # truncate for response size
        "select_columns": select_columns,
        "where_params": where_params,
    }
