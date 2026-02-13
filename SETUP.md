# MERN Dashboard – Local Setup Guide

Full-stack dashboard from [JavaScript Mastery](https://www.youtube.com/@javascriptmastery)'s tutorial: **Build and Deploy a Full Stack MERN Application With CRUD, Auth, and Charts Using Refine**.

## Tech Stack

- **Frontend:** React + TypeScript + Refine + Material UI + ApexCharts
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Auth:** Google OAuth
- **Storage:** Cloudinary (property images)

## Quick Start

### 1. Start the backend server

```bash
cd server
npm start
```

Server runs at **http://localhost:8080**

### 2. Start the frontend

In a new terminal:

```bash
cd client
npm run dev
```

App runs at **http://localhost:3000** (or the port shown in the terminal)

---

## Credentials

The project uses demo credentials from the tutorial. For production, replace them with your own.

### MongoDB Atlas
- **Current:** Tutorial MongoDB cluster (shared)
- **Your own:** Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas) and set `MONGODB_URL` in `server/.env`

### Google OAuth (fix "flowName=GeneralOAuthLite" / sign-in errors)
- **Issue:** The tutorial's Google Client ID doesn't allow localhost. Sign-in fails on local dev.
- **Fix:** Create your own OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
  1. Create a project → APIs & Services → Credentials → Create Credentials → OAuth client ID
  2. Application type: **Web application**
  3. Add to **Authorized JavaScript origins**: `http://localhost:3000`
  4. Copy the Client ID → set `REACT_APP_GOOGLE_CLIENT_ID` in `client/.env`
- **Workaround:** Use **"Continue as Demo User"** on the login page to bypass Google (for local dev only)

### Cloudinary
- **Current:** Tutorial Cloudinary account
- **Your own:** Create at [cloudinary.com](https://cloudinary.com) and set in `server/.env`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

---

## Features

- Dashboard with charts (Total Revenue, Property Referrals)
- Properties CRUD with image upload
- Agents management
- Google Sign-In
- Light/Dark mode
- Responsive Material UI layout
