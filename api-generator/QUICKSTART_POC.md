# 🚀 Quick Start - POC Testing (No Thoughtspot Needed!)

Run the BE API Generator locally with **mock data** - perfect for POC demos and testing with frontend!

---

## ⚡ 3-Step Setup (Takes 2 minutes)

### Step 1: Install Python Dependencies

```bash
cd api-generator

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate    # Mac/Linux
# OR
venv\Scripts\activate       # Windows

# Install packages
pip install -r requirements.txt
```

### Step 2: Run the Server

```bash
python main.py
```

**You should see:**
```
🚀 BE API Generator starting...
🧪 POC MODE ENABLED - Using mock data (no Thoughtspot required)
📊 Mock incidents: 8 sample incidents available
📊 Mock saved answers: 4 sample answers available
✅ Ready to test with frontend!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Test the API

**Open in browser:**
👉 **http://localhost:8000/docs**

You'll see interactive API documentation where you can test ALL endpoints!

---

## 🧪 Test the Endpoints

### Option 1: Interactive Docs (Easiest)

1. Open: **http://localhost:8000/docs**
2. Click any endpoint (e.g., "GET /api/v1/incidents")
3. Click **"Try it out"**
4. Click **"Execute"**
5. See the response with mock data!

### Option 2: Browser

Just paste these URLs in your browser:

```
http://localhost:8000/health
http://localhost:8000/api/v1/status
http://localhost:8000/api/v1/incidents
http://localhost:8000/api/v1/incidents?status=open
http://localhost:8000/api/v1/incidents?severity=critical
http://localhost:8000/api/v1/incidents/INC-001
http://localhost:8000/api/v1/saved-answers
http://localhost:8000/api/v1/saved-answers/answer-001
```

### Option 3: cURL Commands

```bash
# Get all incidents
curl http://localhost:8000/api/v1/incidents

# Filter by status
curl "http://localhost:8000/api/v1/incidents?status=open"

# Filter by severity
curl "http://localhost:8000/api/v1/incidents?severity=critical"

# Get specific incident
curl http://localhost:8000/api/v1/incidents/INC-001

# Get saved answers list
curl http://localhost:8000/api/v1/saved-answers

# Get saved answer data
curl http://localhost:8000/api/v1/saved-answers/answer-001
```

---

## 📊 Mock Data Available

### Incidents (8 total)

| ID | Title | Status | Severity | Project |
|----|-------|--------|----------|---------|
| INC-001 | Phase 2 Trial Delay | open | high | MRTX-001 |
| INC-002 | Budget Overrun - Manufacturing | in-progress | critical | MRTX-002 |
| INC-003 | Regulatory Filing Delay | closed | medium | MRTX-003 |
| INC-004 | Data Quality Issue | open | low | MRTX-001 |
| INC-005 | Supply Chain Disruption | in-progress | high | MRTX-002 |
| INC-006 | Protocol Amendment Required | open | critical | MRTX-001 |
| INC-007 | CRO Performance Issue | closed | medium | MRTX-003 |
| INC-008 | IT System Downtime | closed | low | All Projects |

### Saved Answers (4 total)

1. **answer-001:** Monthly Pipeline Health Report
2. **answer-002:** Clinical Trial Milestones  
3. **answer-003:** Budget vs Actuals Analysis
4. **answer-004:** Risk Register - Active Risks

Each saved answer has realistic mock data with columns and rows.

---

## 🔗 Connect Your Frontend

Once backend is running, configure your frontend:

### Frontend `.env` file:

```bash
REACT_APP_API_GENERATOR_URL=http://localhost:8000/api/v1
```

### Frontend API call example:

```typescript
// Fetch incidents
const response = await fetch('http://localhost:8000/api/v1/incidents');
const data = await response.json();
console.log(data.data); // Array of incidents

// With filters
const response = await fetch('http://localhost:8000/api/v1/incidents?status=open&severity=high');
```

---

## 🎯 POC Demo Flow

### For Your Manager Demo:

1. **Start backend:**
   ```bash
   cd api-generator
   python main.py
   ```

2. **Show interactive docs:**
   - Open: http://localhost:8000/docs
   - Demonstrate each endpoint working
   - Show filtering (status, severity)
   - Show realistic pharma incident data

3. **Start frontend:**
   ```bash
   cd client  # (your manager's frontend code)
   npm start
   ```

4. **Show integration:**
   - Frontend loads incidents from backend
   - Filters work (open/closed, severity levels)
   - Incident details load correctly
   - Saved Answers display data

5. **Explain:**
   - "This is POC mode with mock data"
   - "Once we get Thoughtspot credentials, just change `POC_MODE=false`"
   - "Same API structure will work with real Thoughtspot data"

---

## 🔄 Switching from POC to Production

When ready to use real Thoughtspot:

1. **Get credentials from manager**
2. **Edit `.env` file:**
   ```bash
   POC_MODE=false  # Switch to production mode
   THOUGHTSPOT_HOST=https://gsk.thoughtspot.cloud  # Real URL
   THOUGHTSPOT_USERNAME=your_real_username
   THOUGHTSPOT_PASSWORD=your_real_password
   ```
3. **Restart server:**
   ```bash
   python main.py
   ```

**That's it!** Same API endpoints, same frontend code - now with real Thoughtspot data.

---

## ✅ What This Gives You

**For POC Testing:**
- ✅ No Thoughtspot credentials needed
- ✅ No external dependencies
- ✅ Works 100% offline
- ✅ Perfect for frontend development
- ✅ Perfect for manager demos
- ✅ Realistic pharma data (trials, budgets, incidents)

**For Production:**
- ✅ Just flip `POC_MODE=false`
- ✅ Add real credentials
- ✅ Zero code changes needed
- ✅ Same API structure

---

## 🆘 Troubleshooting

### "ModuleNotFoundError: No module named 'fastapi'"

```bash
pip install -r requirements.txt
```

### "Port 8000 already in use"

```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9

# Or change port in .env
API_PORT=8001
```

### "venv not found"

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 🎉 You're Ready!

**Right now you can:**
1. Run backend with mock data
2. Test all API endpoints
3. Connect frontend and demo
4. Show your manager the POC
5. Switch to real Thoughtspot later (when ready)

**No Render, no Thoughtspot, no complications - just a working API for POC!** 🚀

---

**Start now:**
```bash
cd api-generator
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py

# Then open: http://localhost:8000/docs
```
