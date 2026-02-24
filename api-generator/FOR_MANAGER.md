# 🎯 BE API Generator - Hands-On Testing Guide

> **For: Manager/Reviewer**  
> **From: Nikhil Bhosale**  
> **Purpose: Test the backend API POC**

---

## 🚀 3-Minute Setup (Super Simple!)

### **Step 1: Get the Code**

```bash
# Clone the repository
git clone https://github.com/Nikhil12121/pct-dashboard.git

# Go to the project
cd pct-dashboard

# Switch to the POC branch
git checkout feature/be-api-generator

# Go to the API folder
cd api-generator
```

### **Step 2: Install Python Packages**

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate       # Mac/Linux
# OR
venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt
```

### **Step 3: Run the Server**

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

---

## 🌐 Test the API (Interactive)

### **Open in your browser:**
👉 **http://localhost:8000/docs**

You'll see **Swagger UI** - interactive API documentation where you can test all endpoints!

---

## 🧪 Quick Testing Guide

### **Test 1: Get All Incidents**

1. Click on: **`GET /api/v1/incidents`** (green bar)
2. Click: **"Try it out"** (blue button)
3. Click: **"Execute"** (blue button)
4. Scroll down to see **8 pharma incidents** with:
   - Trial delays
   - Budget overruns
   - Regulatory issues
   - Safety signals

### **Test 2: Filter Open Incidents**

1. Same endpoint (already open)
2. In the **"status"** box, type: `open`
3. Click: **"Execute"**
4. Now see only **3 open incidents**

### **Test 3: Filter Critical Severity**

1. Clear the status box
2. In the **"severity"** box, type: `critical`
3. Click: **"Execute"**
4. See only **2 critical incidents** (most urgent)

### **Test 4: Get Incident Details**

1. Click on: **`GET /api/v1/incidents/{incident_id}`**
2. Click: **"Try it out"**
3. In **"incident_id"** box, type: `INC-002`
4. Click: **"Execute"**
5. See full details of Budget Overrun incident

### **Test 5: Get Thoughtspot Saved Answers**

1. Scroll to **"Thoughtspot"** section
2. Click: **`GET /api/v1/saved-answers`**
3. Click: **"Try it out"**
4. Click: **"Execute"**
5. See 4 available reports (Pipeline Health, Milestones, Budget, Risks)

### **Test 6: Get Report Data**

1. Click: **`GET /api/v1/saved-answers/{answer_id}`**
2. Click: **"Try it out"**
3. Type: `answer-001` (Monthly Pipeline Health)
4. Click: **"Execute"**
5. See structured data with columns and rows - ready for charts!

---

## 📊 What the API Provides

### **Incidents API:**
- ✅ 8 realistic pharma R&D incidents
- ✅ Filtering by status (open, closed, in-progress)
- ✅ Filtering by severity (low, medium, high, critical)
- ✅ Individual incident details
- ✅ Rich metadata (owner, impact, timestamps)

### **Saved Answers API:**
- ✅ 4 pre-built Thoughtspot reports
- ✅ Pipeline health metrics
- ✅ Clinical trial milestones
- ✅ Budget vs actuals analysis
- ✅ Risk register data

### **Technical Features:**
- ✅ RESTful API with FastAPI (Python)
- ✅ Sub-second response times
- ✅ Type-safe data models
- ✅ Interactive documentation (Swagger UI)
- ✅ CORS enabled for frontend integration
- ✅ POC mode with mock data (no Thoughtspot needed yet)

---

## 🎯 POC Demonstration Points

### **1. API Quality**
- Professional-grade REST API
- Auto-generated interactive documentation
- Proper error handling and status codes
- Type-safe with Pydantic models

### **2. Realistic Data**
- Pharma-specific incidents (trials, budgets, regulatory)
- Real business impacts ($1.5M budget overrun, 3-month delays)
- Proper severity levels and status tracking
- Owner assignments to actual teams (Clinical Ops, CMC, Regulatory)

### **3. Production-Ready Features**
- Filtering capabilities for UI
- Individual detail endpoints
- Multiple data sources (incidents, saved answers)
- Health monitoring
- Easy to switch from POC to production

### **4. Next Steps Ready**
- Frontend can connect immediately
- Thoughtspot integration code ready (just add credentials)
- Docker containerization complete
- Deployment configuration ready

---

## 🔄 Production Mode (When Ready)

To switch from POC mock data to real Thoughtspot:

1. **Edit `.env` file:**
   ```bash
   POC_MODE=false  # Change from true to false
   
   # Add real credentials
   THOUGHTSPOT_HOST=https://gsk.thoughtspot.cloud
   THOUGHTSPOT_USERNAME=your_username
   THOUGHTSPOT_PASSWORD=your_password
   ```

2. **Restart server:**
   ```bash
   python main.py
   ```

**That's it!** Same API, now with real Thoughtspot data. Zero code changes.

---

## 📱 Alternative: Use Browser Only

If you don't want to install Python, just look at:

### **GitHub Repository:**
👉 **https://github.com/Nikhil12121/pct-dashboard/tree/feature/be-api-generator**

You can review:
- `api-generator/main.py` - All API endpoints
- `api-generator/mock_data.py` - Sample data
- `api-generator/DEMO_SCRIPT.md` - Full demo walkthrough

---

## 🆘 Troubleshooting

### "Python not found"

**Mac/Linux:**
```bash
# Install Python 3
brew install python3  # Mac
```

**Windows:**
Download from: https://www.python.org/downloads/

### "Port 8000 already in use"

```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9  # Mac/Linux

# Or change port in .env
API_PORT=8001
```

### "Module not found"

```bash
pip install -r requirements.txt
```

---

## ✅ Expected Results

When you test each endpoint:

- **Health:** Returns "healthy" status
- **Incidents (all):** Returns 8 incidents
- **Incidents (filtered):** Returns 1-3 incidents based on filter
- **Incident details:** Returns full incident data
- **Saved Answers:** Returns 4 reports
- **Saved Answer data:** Returns structured table data

**All responses in <1 second. All HTTP 200 status codes.**

---

## 📧 Feedback Questions

After testing, please consider:

1. **API Structure:** Do the endpoints match your frontend needs?
2. **Data Format:** Is the JSON structure correct for your UI?
3. **Filtering:** Are the filter options sufficient?
4. **Additional Features:** What else should we add?
5. **Production:** Ready to move forward with Thoughtspot integration?

---

## 👤 Contact

**Developer:** Nikhil Bhosale  
**Branch:** `feature/be-api-generator`  
**Status:** POC Complete - Ready for Integration

---

**Enjoy testing! The API is fast, reliable, and ready for frontend integration.** 🚀
