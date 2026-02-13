# Get Your Shareable Link – Quick Steps

Your code is committed and ready. Follow these steps to get a live link for your manager.

---

## Step 1: Create GitHub Repo (1 min)

1. Go to **https://github.com/new**
2. Repository name: `pct-dashboard`
3. Set to **Public**
4. **Do NOT** add README, .gitignore, or license
5. Click **Create repository**

---

## Step 2: Push to GitHub (1 min)

Open Terminal and run:

```bash
cd /Users/nikhilbhosale/Desktop/pct/mern-dashboard
git push -u origin main
```

- If prompted for credentials, use your GitHub username and a **Personal Access Token** (not password)
- Create a token at: https://github.com/settings/tokens → Generate new token (classic) → check `repo`

---

## Step 3: Deploy to Vercel (2 min)

1. Go to **https://vercel.com** → Sign up with **GitHub**
2. Click **Add New** → **Project**
3. Import `Nikhil12121/pct-dashboard`
4. Configure:
   - **Root Directory:** Click "Edit" → select `client`
   - **Framework:** Create React App (auto-detected)
5. **Environment Variables** – Add:
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api/v1`  
     *(You'll add the backend URL after Step 4)*
6. Click **Deploy**
7. Copy your live URL (e.g. `https://pct-dashboard-xxx.vercel.app`)

---

## Step 4: Deploy Backend (Optional – for full login)

1. Go to **https://render.com** → Sign up with GitHub
2. **New** → **Web Service**
3. Connect `pct-dashboard` repo
4. Settings:
   - **Root Directory:** `server`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   - `MONGODB_URL` = your MongoDB Atlas connection string
6. Deploy → Copy the URL (e.g. `https://pct-dashboard-xxxx.onrender.com`)
7. Go back to Vercel → Project Settings → Environment Variables → Update `REACT_APP_API_URL` with this URL → Redeploy

---

## Quick Demo (No Backend)

If you just need to show the UI quickly:

- Deploy to Vercel (Step 3) **without** setting `REACT_APP_API_URL`
- The app will load; use **"Continue as Nikhil"** on the login page
- Demo login may not persist data, but the full UI will be visible

---

## Your Shareable Link

After Vercel deploys: **https://pct-dashboard-[your-name].vercel.app**

Share this with your manager.
