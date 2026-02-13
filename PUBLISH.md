# Publish Your PCT Dashboard – Simple Steps

Follow these steps in order. Each takes about 2 minutes.

---

## Step 1: Push to GitHub

1. **Get a token:** Go to https://github.com/settings/tokens  
   - Click **Generate new token (classic)**  
   - Name: `publish`  
   - Check **repo**  
   - Generate → **Copy the token**

2. **Open Terminal in Cursor:** Press `` Ctrl + ` `` (backtick)

3. **Run this** (paste your token where it says YOUR_TOKEN):

```bash
cd /Users/nikhilbhosale/Desktop/pct/mern-dashboard
git remote set-url origin https://Nikhil12121:YOUR_TOKEN@github.com/Nikhil12121/pct-dashboard.git
git push -u origin main
git remote set-url origin https://github.com/Nikhil12121/pct-dashboard.git
```

4. Done. Your code is now at: https://github.com/Nikhil12121/pct-dashboard

---

## Step 2: Deploy to Vercel (Get Live Link)

1. Go to **https://vercel.com**
2. Click **Sign Up** → choose **Continue with GitHub**
3. After login, click **Add New** → **Project**
4. Find **pct-dashboard** in the list → click **Import**
5. Before deploying, click **Edit** next to "Root Directory"
6. Type: `client` → click **Continue**
7. Click **Deploy**
8. Wait 1–2 minutes. You’ll get a link like: **https://pct-dashboard-xxx.vercel.app**

---

## Step 3: Share the Link

Copy the Vercel URL and share it with your manager.

---

## Troubleshooting

**"Repository not found"** – Create the repo first at https://github.com/new (name: `pct-dashboard`)

**"Authentication failed"** – Make sure you’re using a token, not your GitHub password

**Vercel can’t find the repo** – Complete Step 1 first so the code is on GitHub
