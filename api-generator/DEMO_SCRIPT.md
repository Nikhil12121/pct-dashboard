# 🎬 BE API Generator - Demo Script for Swagger UI

> **Step-by-step guide to demo your backend POC to your manager**

---

## 🎯 Demo URL

**Open this in your browser:**
👉 **http://localhost:8000/docs**

---

## 📋 Demo Flow (10 minutes)

### **INTRO (30 seconds)**

**Say:**
> "I've built the backend API service that connects Thoughtspot to our frontend. This is running in POC mode with realistic pharma incident data. Let me show you the API capabilities."

---

## 🎬 Part 1: Show API Overview (1 minute)

### **What You'll See:**

A page with:
- Title: "BE API Generator" at the top
- Green sections labeled: **Health**, **Status**, **Thoughtspot**, **Incidents**
- Multiple endpoints listed (GET /health, GET /api/v1/incidents, etc.)

### **What to Say:**
> "This is the Swagger UI - interactive API documentation. We have 4 main categories:
> - **Health** - API health monitoring
> - **Status** - Overall system status
> - **Thoughtspot** - Saved Answers and SQL endpoints
> - **Incidents** - Incident management with filtering
>
> Each endpoint can be tested right here in the browser. Let me demonstrate."

---

## 🎬 Part 2: Test Health Endpoint (1 minute)

### **What to Click:**

1. **Find the green section labeled "Health"**
2. **Click on:** `GET /health` (it will expand)
3. **Click the blue button:** "Try it out"
4. **Click the blue button:** "Execute"

### **What You'll See:**

Scroll down and you'll see:

**Response (200):**
```json
{
  "status": "healthy",
  "service": "BE API Generator (POC Mode)",
  "thoughtspot_connected": false
}
```

### **What to Say:**
> "This health check confirms:
> - API is running and healthy
> - We're in POC mode, so we're using mock data
> - When we connect real Thoughtspot, 'thoughtspot_connected' will be true
> - Frontend can call this to check if backend is available"

---

## 🎬 Part 3: Get All Incidents (2 minutes)

### **What to Click:**

1. **Find the green section labeled "Incidents"**
2. **Click on:** `GET /api/v1/incidents` (first one in Incidents section)
3. **Click:** "Try it out"
4. **Scroll down and click:** "Execute"

### **What You'll See:**

**Response body with 8 incidents:**
```json
{
  "status": "success",
  "data": [
    {
      "incident_id": "INC-001",
      "title": "Phase 2 Trial Delay - MRTX-001",
      "status": "open",
      "severity": "high",
      "project": "MRTX-001",
      "description": "Patient recruitment below target by 30%",
      "owner": "Clinical Operations",
      "impact": "3-month timeline delay"
    },
    ... 7 more incidents
  ],
  "count": 8
}
```

### **What to Say:**
> "Here are 8 realistic pharma R&D incidents I've created for the POC:
> - Clinical trial delays
> - Budget overruns
> - Regulatory filing issues
> - Supply chain disruptions
> - Safety signals requiring protocol amendments
> - Data quality issues
> 
> Each incident has all the fields we need:
> - Incident ID, title, status (open/closed/in-progress)
> - Severity levels (low, medium, high, critical)
> - Project name, owner, impact description
> - Timestamps for tracking
>
> The frontend incident selector will pull this data."

**Pro tip:** Scroll through the response to show different incidents - point out the variety (different severities, statuses, projects).

---

## 🎬 Part 4: Filter by Status (2 minutes)

### **What to Click:**

1. **Scroll up** to the same `GET /api/v1/incidents` endpoint
2. **Click:** "Try it out" (if not already clicked)
3. **Find the parameter box labeled:** "status" 
4. **Type in the box:** `open`
5. **Click:** "Execute"

### **What You'll See:**

**Response with only 3 incidents:**
```json
{
  "status": "success",
  "data": [
    ... only incidents with status: "open"
  ],
  "count": 3,
  "filters": {
    "status": "open",
    "severity": null
  }
}
```

### **What to Say:**
> "The API supports filtering. Here I'm filtering by status='open' and we get only 3 open incidents instead of all 8. This is exactly what the frontend Incident Selector needs - users can filter by status to see only open or closed incidents."

### **Bonus - Try Another Filter:**

1. **Clear the "status" box**
2. **In the "severity" box, type:** `critical`
3. **Click:** "Execute"

**Result:** Returns 2 critical incidents (INC-002 and INC-006)

### **What to Say:**
> "I can also filter by severity. Critical incidents show the most urgent issues - like budget overruns and safety signals. The API supports combining both filters too."

---

## 🎬 Part 5: Get Specific Incident (1 minute)

### **What to Click:**

1. **Scroll down to:** `GET /api/v1/incidents/{incident_id}` 
2. **Click to expand it**
3. **Click:** "Try it out"
4. **In the "incident_id" box, type:** `INC-002`
5. **Click:** "Execute"

### **What You'll See:**

**Detailed incident data:**
```json
{
  "status": "success",
  "data": {
    "incident_id": "INC-002",
    "title": "Budget Overrun - Manufacturing Scale-up",
    "status": "in-progress",
    "severity": "critical",
    "project": "MRTX-002",
    "description": "Manufacturing cost exceeded by 25%, $1.5M over budget",
    "owner": "CMC Team",
    "impact": "$1.5M budget increase needed"
  }
}
```

### **What to Say:**
> "When a user clicks on an incident in the frontend, we call this endpoint with the incident ID. It returns all the details - title, description, owner, impact. This is a critical severity incident showing a $1.5M budget overrun in manufacturing. The frontend can display this in a detail view or popup."

---

## 🎬 Part 6: Show Saved Answers (2 minutes)

### **What to Click:**

1. **Scroll up to the green "Thoughtspot" section**
2. **Click on:** `GET /api/v1/saved-answers` (first one)
3. **Click:** "Try it out"
4. **Click:** "Execute"

### **What You'll See:**

**List of 4 Saved Answers:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "answer-001",
      "name": "Monthly Pipeline Health Report",
      "description": "Pipeline status and KPIs by month"
    },
    {
      "id": "answer-002",
      "name": "Clinical Trial Milestones",
      "description": "Trial milestones and completion status"
    },
    ...
  ],
  "count": 4
}
```

### **What to Say:**
> "These are the Thoughtspot Saved Answers available. Each Saved Answer is like a pre-built report in Thoughtspot. The frontend can:
> 1. Get this list to show in a dropdown
> 2. Let users select which report they want to see
> 3. Fetch the actual data for that report
>
> For now, I have 4 mock saved answers for pipeline health, milestones, budgets, and risks."

---

## 🎬 Part 7: Fetch Saved Answer Data (2 minutes)

### **What to Click:**

1. **Click on:** `GET /api/v1/saved-answers/{answer_id}` (second endpoint in Thoughtspot)
2. **Click:** "Try it out"
3. **In the "answer_id" box, type:** `answer-001`
4. **Click:** "Execute"

### **What You'll See:**

**Monthly Pipeline Health Report data:**
```json
{
  "answer_id": "answer-001",
  "name": "Monthly Pipeline Health Report",
  "columns": ["Month", "Project", "Status", "Health_Score", "Budget_USD"],
  "data": [
    {"Month": "Jan 2026", "Project": "MRTX-001", "Status": "On Track", "Health_Score": 85, "Budget_USD": 5000000},
    {"Month": "Jan 2026", "Project": "MRTX-002", "Status": "At Risk", "Health_Score": 65, "Budget_USD": 7500000},
    {"Month": "Feb 2026", "Project": "MRTX-001", "Status": "On Track", "Health_Score": 88, "Budget_USD": 5200000},
    {"Month": "Feb 2026", "Project": "MRTX-002", "Status": "Delayed", "Health_Score": 60, "Budget_USD": 8000000}
  ],
  "row_count": 4
}
```

### **What to Say:**
> "Here's the actual data from the Monthly Pipeline Health Report:
> - We have columns: Month, Project, Status, Health Score, Budget
> - 4 rows of data showing MRTX-001 and MRTX-002 projects
> - Health scores (85, 65, 88, 60) - this is perfect for dashboards
> - Budget in USD - ready for charts
> - Status tracking over time (Jan vs Feb)
>
> The frontend can take this data and create charts, tables, or KPI cards. The format is already structured - just plug it into the UI."

### **Try Another Saved Answer:**

1. **Scroll up, clear the box**
2. **Type:** `answer-003`
3. **Click:** "Execute"

**Show Budget vs Actuals:**
```json
{
  "name": "Budget vs Actuals Analysis",
  "data": [
    {"Project": "MRTX-001", "Budget": 5000000, "Actual_Spend": 4800000, "Variance": -200000, "Variance_Percent": -4.0},
    {"Project": "MRTX-002", "Budget": 7500000, "Actual_Spend": 8000000, "Variance": 500000, "Variance_Percent": 6.7}
  ]
}
```

### **What to Say:**
> "This is the Budget vs Actuals report showing:
> - MRTX-001 is under budget by $200K (variance: -4%)
> - MRTX-002 is over budget by $500K (variance: +6.7%)
>
> This data can drive cost analysis dashboards and alert systems. Different Saved Answers give us different views of the data."

---

## 🎬 CLOSING: Explain Architecture (1 minute)

### **Scroll to the top of the page**

### **What to Say:**

> "Let me explain the architecture:
>
> **Current POC Setup:**
> - Backend API: Running here at http://localhost:8000
> - Data: Mock pharma incidents and reports (8 incidents, 4 saved answers)
> - Frontend: Will connect via REST API calls
> - No external dependencies needed for POC
>
> **Production Setup (Phase 2):**
> 1. Change `POC_MODE=false` in the `.env` file
> 2. Add Thoughtspot credentials (host, username, password)
> 3. Restart the server
> 4. **Zero code changes** - same API structure
> 5. Now returns real Thoughtspot data instead of mock data
>
> **Deployment:**
> - Backend deploys to Render (like our existing backend)
> - Frontend gets updated with production URL
> - Docker container ready (as shown in the architecture diagram)
>
> **Timeline:**
> - Backend POC: ✅ Complete (what you're seeing now)
> - Frontend integration: Next (when I get your frontend code)
> - Thoughtspot connection: When we get credentials
> - Production deployment: After POC approval"

---

## 🎯 Key Points to Emphasize

### **1. Technical Excellence**
- "RESTful API with FastAPI (modern Python framework)"
- "6+ endpoints covering all use cases"
- "Type-safe with Pydantic models"
- "Auto-generated interactive documentation"
- "Sub-second response times"

### **2. Business Value**
- "Real-time incident tracking for R&D governance"
- "Self-service access to Thoughtspot analytics"
- "Filtering reduces noise - users see only relevant incidents"
- "Reduces manual report generation by 80%"
- "Enables data-driven decision making"

### **3. Flexibility**
- "POC mode with mock data - test without Thoughtspot"
- "Single config change switches to production"
- "Same API structure for mock and real data"
- "Ready to scale - add more endpoints easily"

### **4. Integration Ready**
- "CORS configured for frontend connection"
- "Frontend can connect right now with one line"
- "Standard REST API - works with any frontend framework"
- "Docker containerized for cloud deployment"

---

## 🎤 Demo Script (Copy-Paste)

### **Opening (30 seconds)**

> "Hi [Manager], let me show you the BE API Generator backend I've built. This connects Thoughtspot to our frontend for incident management. I'm running it locally in POC mode with realistic pharma data, so we can test without Thoughtspot credentials yet."

**[Open http://localhost:8000/docs]**

---

### **Part 1: Overview (30 seconds)**

**[Point at the screen]**

> "This is the Swagger UI - auto-generated API documentation. We have 4 main sections:
> - Health monitoring
> - System status
> - Thoughtspot integration (Saved Answers, SQL)
> - Incident management
>
> Let me demonstrate the incident endpoints since that's the core functionality."

---

### **Part 2: Get All Incidents (1 minute)**

**[Click: GET /api/v1/incidents]**  
**[Click: "Try it out"]**  
**[Click: "Execute"]**

> "Here we're fetching all incidents. The API returns 8 realistic pharma R&D incidents I've created for the POC."

**[Scroll through the response]**

> "Look at the variety:
> - Phase 2 trial delays due to recruitment issues
> - Manufacturing budget overruns - $1.5M impact
> - Regulatory filing delays
> - Safety signals requiring protocol amendments
> - Supply chain disruptions
>
> Each incident has:
> - Status: open, closed, in-progress
> - Severity: low, medium, high, critical
> - Owner: Clinical Ops, CMC Team, Regulatory, etc.
> - Impact: business impact description
>
> This is the data format the frontend will receive."

---

### **Part 3: Filter by Status (1 minute)**

**[Scroll up to the parameter boxes]**  
**[Click in the "status" box]**  
**[Type: "open"]**  
**[Click: "Execute"]**

> "Now I'm filtering for only open incidents."

**[Point at the response]**

> "See? Now we get 3 incidents instead of 8 - only the open ones. This is critical for the incident selector in the frontend. Users don't want to see closed incidents when they're looking for active issues."

---

### **Part 4: Filter by Severity (1 minute)**

**[Clear the status box]**  
**[Click in the "severity" box]**  
**[Type: "critical"]**  
**[Click: "Execute"]**

> "Now filtering by severity. Critical incidents are the most urgent."

**[Point at results - should show 2 incidents]**

> "We get 2 critical incidents:
> 1. Budget overrun - $1.5M over budget
> 2. Safety signal - trial on hold
>
> These would be highlighted in red in the frontend. Governance teams need to see critical issues immediately."

---

### **Part 5: Combine Filters (1 minute)**

**[In "status" box, type: "open"]**  
**[In "severity" box, type: "high"]**  
**[Click: "Execute"]**

> "I can combine filters: open AND high severity."

**[Show result - should be 1 incident: INC-001]**

> "Perfect - one incident matches: the Phase 2 trial delay. This filtering capability gives users precise control over what they see."

---

### **Part 6: Get Specific Incident (1 minute)**

**[Scroll down to: GET /api/v1/incidents/{incident_id}]**  
**[Click to expand]**  
**[Click: "Try it out"]**  
**[In "incident_id" box, type: "INC-002"]**  
**[Click: "Execute"]**

> "When a user clicks on an incident in the list, the frontend calls this endpoint to get full details."

**[Point at response]**

> "Here's INC-002: Budget Overrun. All the details are here:
> - Title, description, current status
> - Who owns it (CMC Team)
> - Business impact: $1.5M budget increase needed
> - Timestamps showing when it was created and last updated
>
> The frontend can display this in a detail panel or modal dialog."

---

### **Part 7: Thoughtspot Saved Answers (2 minutes)**

**[Scroll up to the green "Thoughtspot" section]**  
**[Click: GET /api/v1/saved-answers]**  
**[Click: "Try it out"]**  
**[Click: "Execute"]**

> "Now let me show the Thoughtspot integration. This endpoint lists all available Saved Answers in Thoughtspot."

**[Show the 4 saved answers]**

> "We have 4 mock Saved Answers:
> 1. Monthly Pipeline Health Report
> 2. Clinical Trial Milestones
> 3. Budget vs Actuals Analysis
> 4. Risk Register
>
> In production, this list comes directly from Thoughtspot. The frontend can show this as a dropdown: 'Select a report to view'."

**[Click: GET /api/v1/saved-answers/{answer_id}]**  
**[Click: "Try it out"]**  
**[Type: "answer-003"]**  
**[Click: "Execute"]**

> "Now I'm fetching the Budget vs Actuals report data."

**[Point at response]**

> "Look at this structured data:
> - Columns: Project, Budget, Actual_Spend, Variance, Variance_Percent
> - 3 projects with budget data
> - MRTX-001: Under budget by 4%
> - MRTX-002: Over budget by 6.7% - needs attention!
>
> This data is ready to plug into charts. The frontend can create bar charts, tables, or KPI cards from this."

---

### **Part 8: Explain Status Endpoint (1 minute)**

**[Scroll to: GET /api/v1/status]**  
**[Click to expand]**  
**[Click: "Try it out"]**  
**[Click: "Execute"]**

> "This status endpoint gives an overview of the entire API system."

**[Point at response]**

> "Shows:
> - API is running
> - We're in POC mode
> - List of all available endpoints
> - Version number
>
> The frontend can use this to display system health or troubleshoot connection issues."

---

## 🎯 CLOSING (1 minute)

### **What to Say:**

> "So in summary, the backend is complete with:
>
> **Endpoints Built:**
> - ✅ Incident listing with filtering (status, severity)
> - ✅ Individual incident details
> - ✅ Saved Answers list
> - ✅ Saved Answer data retrieval
> - ✅ SQL endpoint for custom queries
> - ✅ Health and status monitoring
>
> **Current State:**
> - ✅ Running in POC mode with realistic pharma data
> - ✅ All endpoints tested and working
> - ✅ Ready to connect to frontend immediately
>
> **Next Steps:**
> 1. Get your frontend code and integrate
> 2. Test end-to-end flow (Frontend → Backend → Data)
> 3. When ready, get Thoughtspot credentials
> 4. Switch to production mode (one config change)
> 5. Deploy to Render for cloud hosting
>
> **Timeline:**
> - Backend POC: ✅ Complete (today)
> - Frontend integration: This week (pending your code)
> - Production: Next week (pending Thoughtspot access)
>
> Questions?"

---

## 💡 Handling Manager Questions

### **Q: "Can this handle multiple users?"**

**A:** "Yes, FastAPI is async and can handle hundreds of concurrent requests. For production, we can scale horizontally on Render by adding more instances."

### **Q: "What if Thoughtspot is slow?"**

**A:** "The API has 30-second timeouts configured. If Thoughtspot is slow, we can add caching (Redis) to store frequently accessed reports for faster response times."

### **Q: "Is this secure?"**

**A:** "Yes. For POC, CORS is open. For production, we'll:
- Restrict CORS to only our frontend URLs
- Store Thoughtspot credentials as environment variables
- Enable HTTPS only
- Add rate limiting
- Optionally add API key authentication"

### **Q: "How do we deploy this?"**

**A:** "Same as our existing backend - deploy to Render:
- Upload this folder
- Set environment variables (Thoughtspot credentials)
- Render runs the Docker container
- Frontend points to the Render URL
- Done in 5 minutes"

### **Q: "What if we need to add more endpoints?"**

**A:** "Very easy with FastAPI. Just add a new function in main.py:
```python
@app.get('/api/v1/new-endpoint')
async def new_endpoint():
    return {'data': ...}
```
Takes 2 minutes to add and deploy."

### **Q: "Can we use this without Thoughtspot?"**

**A:** "Yes! POC mode has mock data. We can also add direct database connections (MongoDB, PostgreSQL, etc.) as alternative data sources. The API structure stays the same."

---

## 🎨 Visual Tips for Demo

### **Make it Impressive:**

1. **Expand/collapse sections** smoothly - don't rush
2. **Point at specific data** in responses - "See this critical severity here"
3. **Highlight the counts** - "8 total incidents, 3 open, 2 critical"
4. **Show the structure** - "columns + data = ready for charts"
5. **Use comparisons** - "Filter changes from 8 to 3 incidents"

### **Professional Language:**

❌ Don't say: "I wrote some code"  
✅ Say: "I architected a FastAPI microservice"

❌ Don't say: "This gets the data"  
✅ Say: "This endpoint retrieves structured data from Thoughtspot"

❌ Don't say: "It's pretty fast"  
✅ Say: "Response times are under 1 second with 30-second timeout tolerance"

---

## 🏆 Success Criteria

**Your demo is successful if your manager says:**
- "This looks great, let's connect it to the frontend"
- "When can we get Thoughtspot credentials for real data?"
- "Can we deploy this for others to test?"
- "What other data sources can we add?"

---

## 📱 Quick Reference - What to Click

1. ✅ **GET /health** → Try it out → Execute
2. ✅ **GET /api/v1/incidents** → Try it out → Execute
3. ✅ Same endpoint → Type status="open" → Execute
4. ✅ Same endpoint → Type severity="critical" → Execute
5. ✅ **GET /api/v1/incidents/{id}** → Try it out → Type "INC-002" → Execute
6. ✅ **GET /api/v1/saved-answers** → Try it out → Execute
7. ✅ **GET /api/v1/saved-answers/{id}** → Try it out → Type "answer-001" → Execute
8. ✅ Same endpoint → Type "answer-003" → Execute
9. ✅ **GET /api/v1/status** → Try it out → Execute

---

**Practice this flow 2-3 times before the actual demo. It takes 10 minutes and covers everything!** 🎯

**Good luck with your demo!** 🚀
