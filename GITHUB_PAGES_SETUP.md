# Deploy Frontend to GitHub Pages

GitHub Pages was showing README because it serves the repo root by default. Your React app needs to be **built** and **deployed** to the `gh-pages` branch.

---

## What Was Added

1. **GitHub Actions workflow** (`.github/workflows/deploy.yml`) – Builds the React app and deploys to GitHub Pages on every push to `main`
2. **Homepage** in `client/package.json` – Tells the build to use the correct base path for GitHub Pages

---

## Setup Steps

### 1. Push the changes

```bash
cd /Users/nikhilbhosale/Desktop/pct/mern-dashboard
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to **https://github.com/Nikhil12121/pct-dashboard**
2. **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`
4. Click **Save**

### 3. Wait for the first deployment

- The GitHub Action runs automatically on push
- Go to **Actions** tab → wait for "Deploy to GitHub Pages" to complete (1–2 min)
- After it succeeds, the `gh-pages` branch will be created

### 4. Your live URL

**https://nikhil12121.github.io/pct-dashboard/**

---

## Note: Vercel vs GitHub Pages

You already have the app on **Vercel** (https://pct-dashboard-xi.vercel.app), which works well for React apps.

**GitHub Pages** is now set up as an alternative. Use whichever you prefer to share.
