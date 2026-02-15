# Deploy Backend – Make App Work for Everyone

The CORS fix is already in the code. Follow these steps to deploy the backend and connect it to your live frontend.

---

## Step 1: Deploy Backend to Render (~5 min)

1. Go to **[render.com](https://render.com)** → Sign up with GitHub
2. Click **New** → **Web Service**
3. Connect repo: `Nikhil12121/pct-dashboard`
4. Configure:
   - **Name:** `pct-dashboard-api` (or any name)
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables** → Add:
   - `MONGODB_URL` = your MongoDB Atlas connection string (same as in your local `server/.env`)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (optional, if you use image uploads)
6. Click **Create Web Service**
7. Wait for deploy to finish, then **copy your backend URL** (e.g. `https://pct-dashboard-api.onrender.com`)

---

## Step 2: Set API URL in Vercel

1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)** → your `pct-dashboard` project
2. **Settings** → **Environment Variables**
3. Add (or edit):
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://YOUR-RENDER-URL.onrender.com/api/v1`  
     *(Replace with your actual Render URL from Step 1)*
4. **Deployments** → **Redeploy** (latest deployment) to apply the new variable

---

## Step 3: Update Google OAuth (for Google Sign-In)

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)** → APIs & Services → Credentials
2. Open your OAuth 2.0 Client ID
3. **Authorized JavaScript origins** → Add: `https://pct-dashboard-xi.vercel.app`
4. **Authorized redirect URIs** → Add: `https://pct-dashboard-xi.vercel.app`
5. Save

---

## Done

Your app at **https://pct-dashboard-xi.vercel.app** will now work for everyone.

> **Note:** Render free tier sleeps after ~15 min of inactivity. First load after sleep may take 30–60 seconds. Use [cron-job.org](https://cron-job.org) to ping your backend every 14 min if you want to keep it awake.
