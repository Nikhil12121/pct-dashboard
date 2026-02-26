# API Mapper & SQL Generator – Requirements

> Based on manager mockups, voice memo transcript, and real Thoughtspot Saved Answer format.

---

## Thoughtspot Saved Answer Format (Real)

Example from production:

```json
{
  "metadata_id": "da0110cd-9e00-4bb1-8f17-e936c6838b35",
  "metadata_name": "IPE Forecast Summary",
  "metadata_type": "ANSWER",
  "sql_queries": [{
    "metadata_id": "da0110cd-9e00-4bb1-8f17-e936c6838b35",
    "metadata_name": "IPE Forecast Summary",
    "sql_query": "SELECT \"ta_1\".\"clinical_study_key\" \"ca_1\", \"ta_2\".\"Plan State\" \"ca_2\", ... FROM ... WHERE ( \"ta_3\".\"Year\" >= 2021 AND ... ) GROUP BY ..."
  }]
}
```

- **One SQL per answer**: Each saved answer has one (or more) `sql_query` behind it.
- **Parse the SQL**: Backend parses `sql_query` to get SELECT columns and WHERE conditions, then populates the API Mapper (no need to run DESCRIBE in POC if we parse).

---

## Flow (from voice memo)

1. **Source**
   - Show list of TS Answers (from Thoughtspot or mock).
   - User clicks one → load that answer (including its SQL).
   - “I take the SQL, and create an interface… I have a list of all the answers that I'm pulling. And I select this, and then I see the SQL below, and I'll get like a mapping, visual, API mapper.”

2. **API Mapper**
   - Table: **Clause**, **Field**, **Data Type**, **Default Value List**, **Response Field Name**, **Is required in Response**, **User Input Required**.
   - **SELECT clause**: Parsed from SQL (or from DESCRIBE). Each row = one column. “Is required in response” = Y/N. “User input required” = NA (only SELECT goes in response).
   - **WHERE clause**: Parsed from SQL. Each row = one condition/parameter. “User input required” = Y → that field becomes an **API parameter** (e.g. frontend passes `project_key`, `date_key`). “Is required in response” = NA for WHERE.
   - Response Field Name = name in JSON response (can override). Default value list can be used for WHERE (can ignore initially).

3. **Generate**
   - Button: “Generate”.
   - Outputs:
     - **SQL View** – the SQL (or a view definition) that will be run.
     - **Sample Data** – e.g. first 50 records so we know “this is the SQL and this is what we get”.
     - **API SQL Code Template** – parameterized template: when API is called with params (e.g. `project_key=X`), backend runs this SQL and returns JSON. “This goes, creates this one… this generate will go create this one.”

4. **Define (second screen)**
   - Same table UI: **Property**, **Description**, **Value**, **Notes**.
   - Rows: Method (GET/PUT/PATCH – usually GET), Version, API Name, Full API Call, Description, Swagger Update (Y), Response JSON Schema, Response JSON Sample, Sample Data, API SQL Code Template.
   - “Once mapping is done, we'll go for refine… define. In define we'll define things like method, version, API name, value, notes.”

5. **Publish / Swagger**
   - After Define, user can deploy/publish to a server and update Swagger so the API is visible and callable from any frontend. (POC can stub this.)

6. **No deployment required for POC**
   - “We don't need to deploy it, even if I can run this on my terminal.” So run locally or in Docker is enough.

---

## Backend Behaviour

- **List answers**: Existing `GET /api/v1/saved-answers` (or equivalent for real TS).
- **Parse TS answer and get API Mapper schema**:
  - **New**: `POST /api/v1/api-mapper/parse-answer`  
    Body: Thoughtspot answer JSON (`metadata_id`, `metadata_name`, `sql_queries` with `sql_query`).  
    Response: `schema` (API Mapper rows), plus `select_columns`, `where_params`, and optionally truncated `sql_query`.
- **Generate**: Existing `POST /api/v1/api-mapper/generate` with `answer_id` and `mapper_rows` → returns SQL view, sample data, API SQL code template.
- **Schema by ID (mock)**: Existing `GET /api/v1/api-mapper/schema/{answer_id}` for predefined answers; can stay for demos.

---

## UI Behaviour

- **Screen 1**
  - Source: list of TS Answers; on click load SQL (and optionally show “SQL below”).
  - When TS answer is loaded (by ID or by posting full payload), call parse-answer or schema endpoint and **populate API Mapper table** from `schema`.
  - User edits Response Field Name, Is required in Response, User Input Required.
  - Generate → call generate endpoint → show SQL View, Sample Data, API SQL Code Template in the three output tabs.
- **Screen 2**
  - Define: same table UI (Property, Description, Value, Notes) with Method, Version, API Name, Full API Call, Description, Swagger Update, Response JSON Schema, Response JSON Sample, Sample Data, API SQL Code Template. Values can be filled from Generate output.

---

## Summary

- **One TS Saved Answer** = one SQL (in `sql_queries[].sql_query`).
- **Click TS Answer** → backend parses that SQL → **API Mapper** is filled with Select (response columns) and Where (API parameters).
- User sets **response names** and **user input required** (Y = API param), then **Generate** → **SQL View**, **Sample Data**, **API SQL Code Template**.
- **Define** screen = same table UI for API properties; optional **Publish** to update Swagger. POC can run locally (no deploy required).
