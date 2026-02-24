# 🚀 Deploy in 2 Minutes - Copy & Paste This

## Step 1: Go to Render

👉 **https://dashboard.render.com/**

**Sign in** (use GitHub)

---

## Step 2: Create New Web Service

1. Click **"New +"** (top right, blue button)
2. Click **"Web Service"**
3. Find **"pct-dashboard"** in the list
4. Click **"Connect"**

---

## Step 3: Copy & Paste These Settings

**COPY THESE VALUES EXACTLY:**

| Setting | Value (Copy This) |
|---------|-------------------|
| **Name** | `be-api-generator` |
| **Region** | `Oregon (US West)` |
| **Branch** | `feature/be-api-generator` |
| **Root Directory** | `api-generator` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | `Free` |

---

## Step 4: Add Environment Variable

**Scroll down to "Environment Variables":**

1. Click **"Add Environment Variable"**
2. **Key:** Type `POC_MODE`
3. **Value:** Type `true`
4. Click **"Add"** or just press Enter

---

## Step 5: Deploy!

1. Click **"Create Web Service"** (big button at bottom)
2. **Wait 2-3 minutes** (watch the logs - you'll see it installing)
3. When you see **"Live"** (green badge at top) - DONE!

---

## ✅ Get Your URL

At the top left, you'll see your URL:

```
https://be-api-generator.onrender.com
```

**Your API docs URL (Share this!):**
```
https://be-api-generator.onrender.com/docs
```

---

## 📧 Send This to Your Manager

**Copy & Paste:**

```
Hi [Manager],

Backend API is live! Test it here (no installation needed):

🌐 https://be-api-generator.onrender.com/docs

Click the link → Click any endpoint → Click "Try it out" → Click "Execute"

You'll see:
✅ 8 realistic pharma incidents
✅ Filtering by status and severity
✅ Incident details
✅ Thoughtspot saved answers
✅ All working live!

Available 24/7. Let me know when you want to connect the frontend!

Best,
Nikhil
```

---

## ⚠️ Important Note

**First request may take 30 seconds** (Render free tier wakes up from sleep).

**Before your manager clicks:**
- Visit the URL yourself once
- Wait 30 seconds
- Then it's instant for your manager!

---

**That's it! Follow these steps and you'll have a live URL to share in 2 minutes!** 🚀
