# Deployment Guide: PCT Dashboard

This guide helps you push the PCT (Pipeline Control Tower) app to GitHub and host it for free.

---

## 1. Push to GitHub

### Step 1: Initialize Git (if not already done)

```bash
cd /Users/nikhilbhosale/Desktop/pct/mern-dashboard
git init
```

### Step 2: Add Remote & Push

```bash
git add .
git commit -m "Initial commit: PCT Pipeline Control Tower dashboard"
git branch -M main
git remote add origin https://github.com/Nikhil12121/pct-dashboard.git
git push -u origin main
```

> **Note:** Create a new repo first at [github.com/new](https://github.com/new) named `pct-dashboard` (or any name). Then use that repo URL in the `git remote add` command.

### Step 3: Secure Your Secrets

**Never commit `.env` files.** They're already in `.gitignore`. Before pushing:

- Copy `client/.env` to `client/.env.local` for local dev (keep it gitignored)
- Set your real secrets as **environment variables** in your hosting platform (see below)

---

## 2. Free Hosting Options

### Recommended: Vercel (Frontend) + Render (Backend)

| Service | What | Free Tier |
|---------|------|-----------|
| **Vercel** | React frontend | 100GB bandwidth, unlimited projects |
| **Render** | Node/Express backend | 750 hrs/month, sleeps after 15 min inactivity |
| **MongoDB Atlas** | Database | 512MB free cluster |

---

## 3. Deploy Backend (Render)

1. Go to [render.com](https://render.com) and sign up with GitHub.
2. **New → Web Service**.
3. Connect your repo `Nikhil12121/pct-dashboard`.
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install` (or leave empty)
   - **Start Command:** `npm start` (runs `node index.js`)
5. **Environment Variables** (add these):
   - `MONGODB_URL` = your MongoDB Atlas connection string
   - Optional: `CLOUDINARY_*` if using image uploads
6. Deploy. You’ll get a URL like `https://pct-dashboard-xxxx.onrender.com`.

---

## 4. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. **Import Project** → select `Nikhil12121/pct-dashboard`.
3. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
4. **Environment Variables**:
   - `REACT_APP_API_URL` = `https://your-render-url.onrender.com/api/v1` (your backend URL)
   - `REACT_APP_GOOGLE_CLIENT_ID` = your Google OAuth client ID (optional)
5. Deploy. You’ll get a URL like `https://pct-dashboard.vercel.app`.

---

## 5. MongoDB Atlas (Free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free cluster.
3. **Database Access** → Add user (username/password).
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere for deployment).
5. **Connect** → Get connection string.
6. Use this string as `MONGODB_URL` in Render.

---

## 6. CORS (Backend)

If the frontend and backend are on different domains, ensure CORS is configured. In `server/index.js`:

```javascript
app.use(cors({ origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'] }));
```

Or use `cors()` for all origins during development.

---

## 7. Quick Reference

| Environment Variable | Where | Example |
|---------------------|-------|---------|
| `MONGODB_URL` | Render (server) | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `REACT_APP_API_URL` | Vercel (client) | `https://pct-dashboard.onrender.com/api/v1` |
| `REACT_APP_GOOGLE_CLIENT_ID` | Vercel (client) | Optional; demo login works without it |

---

## 8. Alternative Free Hosting

- **Render** – Frontend + backend (separate services)
- **Railway** – Free tier for small apps
- **Cyclic** – Node.js backend
- **Netlify** – Frontend (alternative to Vercel)

---

## 9. Resume After Sleep (Render)

Render free tier sleeps after ~15 minutes of inactivity. The first request after sleep can take 30–60 seconds. Use [cron-job.org](https://cron-job.org) (free) to ping your backend every 14 minutes to keep it awake if needed.

---

## 10. Your GitHub Repo

After setup, your project will be at:

**https://github.com/Nikhil12121/pct-dashboard**

Live app: [https://pct-dashboard.vercel.app](https://pct-dashboard.vercel.app) (example)
