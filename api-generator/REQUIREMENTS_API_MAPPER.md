# API Mapper & SQL Generator – Requirements

> Based on manager mockups and description. Voice memo could not be processed; requirements are from screenshots and written brief.

---

## 1. Screen 1: Source + API Mapper + Generate

### 1.1 Source tab
- **Left panel** with tabs: **Source** | **Swagger**.
- **Source** tab shows list of **TS Answers** (e.g. TS Answer1, TS Answer2).
- Each TS Answer = one SQL query behind it (Thoughtspot Saved Answer).
- **On click** on a TS Answer:
  - Backend fetches that answer’s data/schema.
  - **API Mapper** table is filled with rows (one per field), so user can configure parameters.

### 1.2 API Mapper table (Define)
- Columns:
  - **Clause** – e.g. Select, Where.
  - **Field** – field/database column name.
  - **Data Type** – (optional in mock).
  - **Default Value List** – (optional).
  - **Response Field Name** – name in API response.
  - **Is required in Response** – Y / N.
  - **User Input Required** – Y / N / NA.
- Rows come from the selected TS Answer (e.g. Date Key, Plan Key in Select; project_key, date_key in Where).
- User can edit: Response Field Name, Is required in Response, User Input Required (and optionally others).

### 1.3 Generate
- **Generate** button below the API Mapper table.
- On click:
  - Send current API Mapper configuration to backend.
  - Backend returns:
    - **SQL View**
    - **Sample Data**
    - **API SQL Code Template**
- These appear in **output tabs** (or sections) below: **SQL View** | **Sample Data** | **API SQL Code Template**.

### 1.4 Swagger tab
- Placeholder for Swagger/OpenAPI view (e.g. link to `/docs` or embedded spec). No specific behaviour required in first version beyond navigation.

---

## 2. Screen 2: Property & Description (Define)

- **Same table UI** as elsewhere: table with columns.
- Columns: **Property** | **Description** | **Value** | **Notes**.
- Rows (properties) include:
  - **Method** – e.g. GET | PUT | PATCH.
  - **Version**
  - **API Name**
  - **Full API Call**
  - **Description**
  - **Swagger Update** – e.g. Y/N.
  - **Response JSON Schema**
  - **Response JSON Sample**
  - **Sample Data**
  - **API SQL Code Template**
- Values and descriptions can be filled by user or by system (e.g. from Generate output).
- Same table layout and styling as Screen 1 for consistency.

---

## 3. Flow summary

1. User selects a **TS Answer** in Source → API Mapper table is populated from that answer’s schema.
2. User sets **Response Field Name**, **Is required in Response**, **User Input Required** (and any other editable columns).
3. User clicks **Generate** → backend returns **SQL View**, **Sample Data**, **API SQL Code Template**.
4. User can open **Screen 2** and see/edit **Property & Description** in the same table UI (Method, Version, API Name, Full API Call, etc.).

---

## 4. Out of scope for first version

- Real Thoughtspot connection (use mock TS Answers and mock schema).
- Real SQL execution (mock SQL View and Sample Data).
- Persistence of API Mapper or Property definitions (in-memory / session only unless specified later).
- Authentication (open UI for POC).

---

## 5. Corrections

If the voice memo specified different:
- field names,
- extra columns,
- or different screens,

this document can be updated and the UI/backend adjusted accordingly.
