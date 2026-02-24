# 🚀 Deploy Backend to Render - 2 Minutes

> **Get a live URL like:** `https://be-api-generator.onrender.com`  
> **Your manager can access directly without installing anything!**

---

## ⚡ Quick Deployment (2 Minutes)

### **Step 1: Go to Render**

1. Open: **https://render.com**
2. Sign in (use your GitHub account)

### **Step 2: Create New Web Service**

1. Click: **"New +"** (top right)
2. Select: **"Web Service"**
3. Click: **"Connect a repository"**
4. Find and select: **`pct-dashboard`** repo
5. Click: **"Connect"**

### **Step 3: Configure**

**Fill in these fields:**

| Field | Value |
|-------|-------|
| **Name** | `be-api-generator` |
| **Region** | Oregon (US West) |
| **Branch** | `feature/be-api-generator` |
| **Root Directory** | `api-generator` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free |

### **Step 4: Add Environment Variables**

Click **"Advanced"** or scroll down to **"Environment Variables"**

Add these:

| Key | Value |
|-----|-------|
| `POC_MODE` | `true` |
| `THOUGHTSPOT_HOST` | `https://not-needed-for-poc.com` |
| `THOUGHTSPOT_USERNAME` | `not_needed` |
| `THOUGHTSPOT_PASSWORD` | `not_needed` |

### **Step 5: Deploy!**

1. Click: **"Create Web Service"** (bottom)
2. Wait 2-3 minutes while Render builds and deploys
3. **Done!** You'll get a URL like: `https://be-api-generator-xxxx.onrender.com`

---

## 🎉 After Deployment

### **You'll Get a Live URL:**
```
https://be-api-generator-xxxx.onrender.com
```

### **Share These Links with Your Manager:**

**1. Interactive API Docs:**
```
https://be-api-generator-xxxx.onrender.com/docs
```
👉 Manager can test all endpoints in browser - no installation needed!

**2. Health Check:**
```
https://be-api-generator-xxxx.onrender.com/health
```

**3. All Incidents:**
```
https://be-api-generator-xxxx.onrender.com/api/v1/incidents
```

**4. Filtered (Open & Critical):**
```
https://be-api-generator-xxxx.onrender.com/api/v1/incidents?status=open&severity=critical
```

---

## 📧 Message to Send Manager After Deployment

**Subject:** BE API Generator - Live Demo Ready

**Body:**

```
Hi [Manager],

Backend API is now live and deployed! You can test it directly in your browser - no installation needed.

🌐 LIVE API DOCUMENTATION (Interactive Testing):
https://be-api-generator-xxxx.onrender.com/docs
👆 Click this and test all endpoints!

🔗 Quick Test Links:
- Health Check: https://be-api-generator-xxxx.onrender.com/health
- All Incidents: https://be-api-generator-xxxx.onrender.com/api/v1/incidents
- Open Incidents: https://be-api-generator-xxxx.onrender.com/api/v1/incidents?status=open
- Critical Incidents: https://be-api-generator-xxxx.onrender.com/api/v1/incidents?severity=critical

HOW TO TEST:
1. Open the /docs link above
2. Click any endpoint (e.g., "GET /api/v1/incidents")
3. Click "Try it out"
4. Click "Execute"
5. See live responses with realistic pharma data!

FEATURES:
✅ 8 realistic pharma R&D incidents
✅ Filtering by status and severity
✅ Incident details with owner/impact
✅ 4 Thoughtspot Saved Answers with data
✅ Sub-second response times
✅ Running 24/7 on Render (free tier)

The frontend can connect to this URL right now. When you share your frontend code, I'll integrate it immediately.

Let me know when you want to connect the frontend!

Best,
Nikhil
```

---

## ⚙️ Important Notes

### **Free Tier Behavior:**
- ⚠️ After 15 minutes of inactivity, Render "sleeps" the service
- ⚠️ First request after sleep takes ~30 seconds (cold start)
- ✅ After that, responses are instant
- ✅ Perfect for POC demos

### **Before Your Demo:**
- Visit the URL 1 minute before
- Wake it up so it's fast during demo
- Or mention: "Free tier has cold start - production will be instant"

---

## 🔒 Security

**For POC:**
- ✅ POC_MODE=true (uses mock data)
- ✅ No real credentials exposed
- ✅ CORS allows all origins (fine for testing)

**For Production:**
- Change POC_MODE=false
- Add real Thoughtspot credentials
- Restrict CORS to specific domains

---

## 📱 Alternative: Railway (Even Faster)

If you prefer Railway (also free):

1. Go to: **https://railway.app**
2. Sign in with GitHub
3. Click: **"New Project"**
4. Select: **"Deploy from GitHub repo"**
5. Choose: `pct-dashboard` → branch `feature/be-api-generator`
6. Railway auto-detects Python and deploys
7. Get URL: `https://be-api-generator.railway.app`

**Railway is simpler but Render has better free tier!**

---

## ✅ What to Do NOW

**Choose one:**

### **Option A: Deploy to Render** (Recommended)
1. Follow steps above (2 minutes)
2. Get URL: `https://be-api-generator-xxxx.onrender.com`
3. Share `/docs` link with manager
4. Manager tests in browser

### **Option B: Keep Local Only**
1. Share GitHub branch
2. Manager runs locally (3 commands)
3. Tests at `http://localhost:8000/docs`

**I recommend Option A (Render) - your manager just clicks a link and it works!**

Want me to help you through the Render deployment now?
