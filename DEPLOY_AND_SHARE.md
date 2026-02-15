# Deploy PCT Dashboard & Share with Others

Complete guide to deploy your app to a domain and share it publicly.

---

## Part 1: Deploy to Production

### What You Need

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **GitHub** | Host your code | Yes |
| **Vercel** | Host frontend (React) | Yes |
| **Render** | Host backend (Node/Express) | Yes |
| **MongoDB Atlas** | Database | Yes (512MB) |

---

### Step 1: Push Code to GitHub

```bash
cd /Users/nikhilbhosale/Desktop/pct/mern-dashboard
git add .
git commit -m "Deploy PCT Dashboard"
git push origin main
```

---

### Step 2: Deploy Backend (Render)

1. Go to **[render.com](https://render.com)** → Sign up with GitHub
2. **New** → **Web Service**
3. Connect repo: `Nikhil12121/pct-dashboard`
4. Configure:
   - **Name:** `pct-dashboard`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables** → Add:
   - `MONGODB_URL` = your MongoDB Atlas connection string
6. **Create Web Service**
7. Wait for deploy → **Copy your URL** (e.g. `https://pct-dashboard.onrender.com`)

---

### Step 3: Deploy Frontend (Vercel)

1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. **Add New** → **Project** → Import `Nikhil12121/pct-dashboard`
3. Configure:
   - **Root Directory:** `client`
   - **Framework:** Create React App
4. **Environment Variables** → Add:
   - `REACT_APP_API_URL` = `https://YOUR-RENDER-URL.onrender.com/api/v1`
   - `REACT_APP_GOOGLE_CLIENT_ID` = (optional, for Google Sign-In)
5. **Deploy**
6. Copy your URL (e.g. `https://pct-dashboard-xi.vercel.app`)

---

### Step 4: Update CORS & Google OAuth

**CORS** – Already in code. Ensure `server/index.js` allows your Vercel domain.

**Google OAuth** (if using Google Sign-In):
1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → Your OAuth Client
2. **Authorized JavaScript origins:** Add your Vercel URL
3. **Authorized redirect URIs:** Add your Vercel URL

---

## Part 2: Add a Custom Domain (Optional)

### On Vercel (Frontend)

1. Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain (e.g. `dashboard.yourdomain.com`)
3. Follow Vercel’s DNS instructions:
   - Add a CNAME record: `dashboard` → `cname.vercel-dns.com`
   - Or use Vercel nameservers if you prefer
4. Wait for SSL (usually a few minutes)

### On Render (Backend)

1. Render Dashboard → Your Service → **Settings** → **Custom Domain**
2. Add domain (e.g. `api.yourdomain.com`)
3. Add CNAME in your DNS: `api` → `your-service.onrender.com`

### Update Environment Variables

- **Vercel:** `REACT_APP_API_URL` = `https://api.yourdomain.com/api/v1`
- **Render:** Add new domain to CORS in `server/index.js`
- **Google OAuth:** Add new domain to Authorized origins

---

## Part 3: Share with Others

### Your Shareable Link

**Production URL:** `https://pct-dashboard-xi.vercel.app`  
(or your custom domain if configured)

### How to Share

1. **Direct link** – Send the URL to anyone
2. **README** – Add the link to your GitHub repo (already in README.md)
3. **Email/Slack** – Share the link in your message

### Login Options for Users

- **"Continue as Nikhil"** – Demo login, works without Google
- **Google Sign-In** – If configured in Google Cloud Console

---

## Part 4: Checklist Before Sharing

| Check | How to Verify |
|-------|---------------|
| Backend is live | Open `https://pct-dashboard.onrender.com` → See `{"message":"Hello World!"}` |
| Frontend is live | Open your Vercel URL → Login page loads |
| API connected | Click "Continue as Nikhil" → Dashboard loads |
| REACT_APP_API_URL set | Vercel → Settings → Environment Variables |
| Redeployed after env change | Vercel → Deployments → Redeploy |

---

## Part 5: Keep Backend Awake (Optional)

Render free tier sleeps after ~15 min. First request after sleep takes 30–60 seconds.

**To keep it awake:**
1. Go to [cron-job.org](https://cron-job.org) (free)
2. Create a cron job: GET `https://pct-dashboard.onrender.com` every 14 minutes

---

## Quick Reference

| Item | URL |
|------|-----|
| **Live App** | https://pct-dashboard-xi.vercel.app |
| **Backend API** | https://pct-dashboard.onrender.com |
| **GitHub Repo** | https://github.com/Nikhil12121/pct-dashboard |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Continue as Nikhil" fails | Set `REACT_APP_API_URL` in Vercel, redeploy |
| Backend not loading | Wait 60 sec (Render wake-up), check Render logs |
| Google Sign-In fails | Add Vercel URL to Google Cloud Console |
| CORS errors | Ensure `server/index.js` allows `*.vercel.app` |
