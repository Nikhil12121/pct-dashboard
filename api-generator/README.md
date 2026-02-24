# BE API Generator

Backend API service to connect **Thoughtspot Saved Answers** to **Frontend UI** for pharma R&D governance and incident management.

---

## 🏗️ Architecture

```
Frontend UI (React)
      ↓
      ↓ HTTP/REST
      ↓
BE API Generator (FastAPI - Python)
      ↓
      ↓ Thoughtspot REST API
      ↓
Thoughtspot Cloud
  - Saved Answers
  - SQL Endpoint
  - Incident Data
```

---

## 📋 What This Backend Does

1. **Connects to Thoughtspot** using REST API
2. **Fetches Saved Answers** (pre-built queries/reports in Thoughtspot)
3. **Executes SQL queries** via Thoughtspot SQL Endpoint
4. **Retrieves incident data** with filtering (status, severity)
5. **Exposes RESTful APIs** for frontend to consume
6. **Handles authentication** and token management with Thoughtspot

---

## 🚀 Quick Start

### Option 1: Run Locally (Python)

```bash
# 1. Navigate to api-generator folder
cd api-generator

# 2. Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your Thoughtspot credentials

# 5. Run the server
python main.py

# API will be available at: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Run with Docker

```bash
# 1. Configure environment variables
cp .env.example .env
# Edit .env with your Thoughtspot credentials

# 2. Build and run with Docker Compose
docker-compose up --build

# API will be available at: http://localhost:8000
```

---

## 🔑 Environment Variables

Create a `.env` file with these variables:

```bash
# Thoughtspot instance URL
THOUGHTSPOT_HOST=https://your-company.thoughtspot.cloud

# Thoughtspot credentials (get from your manager)
THOUGHTSPOT_USERNAME=your_username
THOUGHTSPOT_PASSWORD=your_password

# Optional: Specific Saved Answer ID for incidents
THOUGHTSPOT_INCIDENTS_ANSWER_ID=your-answer-id

# API Port
API_PORT=8000
```

**Where to get these:**
1. Ask your manager for Thoughtspot credentials
2. Login to Thoughtspot UI
3. Find your Saved Answers and copy their IDs

---

## 📡 API Endpoints

### 1. Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "service": "BE API Generator",
  "thoughtspot_connected": true
}
```

### 2. Get All Saved Answers
```
GET /api/v1/saved-answers
```
**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "answer-123",
      "name": "Monthly Pipeline Report",
      "description": "Pipeline metrics by month",
      "created": "2026-01-15",
      "modified": "2026-02-20"
    }
  ],
  "count": 1
}
```

### 3. Get Saved Answer Data
```
GET /api/v1/saved-answers/{answer_id}
```
**Response:**
```json
{
  "answer_id": "answer-123",
  "name": "Monthly Pipeline Report",
  "columns": ["Month", "Project", "Status", "Budget"],
  "data": [
    {"Month": "Jan", "Project": "MRTX-001", "Status": "On Track", "Budget": 500000},
    {"Month": "Feb", "Project": "MRTX-002", "Status": "Delayed", "Budget": 750000}
  ],
  "row_count": 2
}
```

### 4. Execute SQL Query
```
GET /api/v1/sql-endpoint?query=SELECT * FROM incidents WHERE status='open'
```
**Response:**
```json
{
  "status": "success",
  "query": "SELECT * FROM incidents WHERE status='open'",
  "columns": ["incident_id", "title", "status"],
  "data": [...],
  "row_count": 5
}
```

### 5. Get Incidents (with filters)
```
GET /api/v1/incidents?status=open&severity=high
```
**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "incident_id": "INC-001",
      "title": "Phase 2 Trial Delay",
      "status": "open",
      "severity": "high",
      "created_at": "2026-02-10T10:30:00Z",
      "updated_at": "2026-02-20T15:45:00Z"
    }
  ],
  "count": 1,
  "filters": {"status": "open", "severity": "high"}
}
```

### 6. Get Incident Details
```
GET /api/v1/incidents/{incident_id}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "incident_id": "INC-001",
    "title": "Phase 2 Trial Delay",
    "status": "open",
    "severity": "high",
    "description": "Patient recruitment below target",
    "created_at": "2026-02-10T10:30:00Z"
  }
}
```

---

## 🧪 Testing the API

### Interactive API Documentation

Once the server is running, visit:

**Swagger UI:** http://localhost:8000/docs

This gives you:
- Interactive API testing
- Try each endpoint directly in browser
- See request/response schemas
- Test with different parameters

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# Get all saved answers
curl http://localhost:8000/api/v1/saved-answers

# Get specific saved answer data
curl http://localhost:8000/api/v1/saved-answers/your-answer-id

# Get incidents with filters
curl "http://localhost:8000/api/v1/incidents?status=open&severity=high"
```

---

## 🔗 Connecting Frontend to Backend

### Frontend Configuration

In your frontend `.env` file:

```bash
# Point to this FastAPI backend
REACT_APP_API_GENERATOR_URL=http://localhost:8000/api/v1

# For production
REACT_APP_API_GENERATOR_URL=https://your-api-generator.onrender.com/api/v1
```

### Frontend API Calls (Example)

```typescript
// Fetch incidents for incident selector
const fetchIncidents = async (status?: string, severity?: string) => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (severity) params.append('severity', severity);
  
  const response = await fetch(
    `${process.env.REACT_APP_API_GENERATOR_URL}/incidents?${params}`
  );
  const data = await response.json();
  return data.data;
};

// Fetch saved answer data
const fetchSavedAnswer = async (answerId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_GENERATOR_URL}/saved-answers/${answerId}`
  );
  const data = await response.json();
  return data;
};
```

---

## 🔧 Integration Steps

### Step 1: Get Thoughtspot Credentials

Ask your manager for:
1. Thoughtspot instance URL
2. Username and password
3. Saved Answer IDs you need to access

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`
2. Fill in Thoughtspot credentials
3. Add specific Saved Answer IDs

### Step 3: Test Connection

```bash
# Run the backend
python main.py

# Visit health endpoint
curl http://localhost:8000/health

# Should show: "thoughtspot_connected": true
```

### Step 4: Get Frontend Code

1. Get frontend code from your manager
2. Configure frontend to point to `http://localhost:8000/api/v1`
3. Test integration

### Step 5: Deploy to Production

**Backend (Render):**
1. Create new Web Service on Render
2. Connect GitHub repo, select `api-generator` folder
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port 8000`
5. Add environment variables (Thoughtspot credentials)

**Frontend:**
- Update `REACT_APP_API_GENERATOR_URL` to Render URL
- Redeploy frontend

---

## 📊 Mock Data for POC

The backend includes **mock incident data** so you can test without Thoughtspot access:

```python
# In thoughtspot_service.py
mock_data = [
  {
    "incident_id": "INC-001",
    "title": "Phase 2 Trial Delay - MRTX-001",
    "status": "open",
    "severity": "high",
    ...
  },
  ...
]
```

This allows you to:
- Test API endpoints immediately
- Develop frontend without waiting for Thoughtspot access
- Demo the POC to your manager
- Replace with real Thoughtspot data later

---

## 🏢 Production Deployment

### Deploy to Render

1. **Create Web Service:**
   - Go to: https://render.com
   - New → Web Service
   - Connect GitHub repo

2. **Configure:**
   - Name: `api-generator`
   - Root Directory: `api-generator`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables:**
   - Add all variables from `.env`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Get URL: `https://api-generator-xxxx.onrender.com`

### Update Frontend

```bash
# In frontend .env
REACT_APP_API_GENERATOR_URL=https://api-generator-xxxx.onrender.com/api/v1
```

---

## 🧪 Testing Checklist

- [ ] Backend runs locally: `python main.py`
- [ ] Health endpoint returns 200: `/health`
- [ ] Saved answers endpoint works: `/api/v1/saved-answers`
- [ ] Incidents endpoint returns data: `/api/v1/incidents`
- [ ] Filters work: `/api/v1/incidents?status=open`
- [ ] Frontend can connect to backend
- [ ] CORS allows frontend origin
- [ ] Thoughtspot authentication works
- [ ] Real data flows from Thoughtspot → Backend → Frontend

---

## 📁 Project Structure

```
api-generator/
├── main.py                      # FastAPI app entry point
├── services/
│   ├── __init__.py
│   └── thoughtspot_service.py   # Thoughtspot API integration
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables (not committed)
├── .env.example                 # Environment template
├── Dockerfile                   # Docker container config
├── docker-compose.yml           # Docker Compose setup
└── README.md                    # This file
```

---

## 🐛 Troubleshooting

### Issue: "Thoughtspot connection failed"

**Solution:**
1. Check credentials in `.env`
2. Verify Thoughtspot URL is correct (no trailing slash)
3. Test login at Thoughtspot UI manually
4. Check network/firewall allows connection

### Issue: "CORS error in frontend"

**Solution:**
1. Add your frontend URL to `allow_origins` in `main.py`
2. Restart FastAPI server
3. Clear browser cache

### Issue: "Module not found"

**Solution:**
```bash
pip install -r requirements.txt
```

---

## 📚 Next Steps

1. ✅ **Get Thoughtspot credentials** from manager
2. ✅ **Configure `.env`** with real credentials
3. ✅ **Test backend** at http://localhost:8000/docs
4. ✅ **Get frontend code** from manager
5. ✅ **Connect frontend to backend**
6. ✅ **Test end-to-end flow**
7. ✅ **Deploy to Render** (production)
8. ✅ **Merge to main branch** if everything works

---

## 🎯 Business Value

**For GSK Pharma R&D:**
- Real-time access to Thoughtspot analytics via API
- Incident management with filtering and selection
- Automated data pipeline from Thoughtspot to custom dashboards
- Reduced manual report generation
- Self-service analytics for stakeholders

**Technical Benefits:**
- RESTful API layer over Thoughtspot
- Scalable FastAPI framework
- Docker containerization for easy deployment
- Mock data for rapid POC development
- Type-safe with Pydantic models

---

**Need help? Check the interactive docs at `/docs` when server is running!**
