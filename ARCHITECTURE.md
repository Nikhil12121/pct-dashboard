# PCT Dashboard - Technical Architecture Documentation

> **Pipeline Control Tower** – A full-stack MERN application for pharma R&D pipeline management

---

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Application Layers](#application-layers)
4. [Data Flow](#data-flow)
5. [Authentication Flow](#authentication-flow)
6. [API Architecture](#api-architecture)
7. [Database Schema](#database-schema)
8. [Deployment Architecture](#deployment-architecture)
9. [Environment Configuration](#environment-configuration)
10. [File Structure](#file-structure)

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React App (TypeScript)                                   │  │
│  │  - Refine Framework (CRUD operations)                     │  │
│  │  - Material UI (Components)                               │  │
│  │  - ApexCharts (Data visualization)                        │  │
│  │  - React Router v6 (Navigation)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│                      HTTPS REST API                              │
│                              ↕                                   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Node.js + Express.js                                     │  │
│  │  - RESTful API endpoints                                  │  │
│  │  - CORS configuration                                     │  │
│  │  - Request/Response handling                              │  │
│  │  - Controllers (Business logic)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│                      MongoDB Driver                              │
│                              ↕                                   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MongoDB Atlas (Cloud Database)                           │  │
│  │  - Collections: users, properties                         │  │
│  │  - Mongoose ODM for schema validation                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│  - Google OAuth 2.0 (Authentication)                            │
│  - Cloudinary (Image storage - optional)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend (Client)

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.x |
| **TypeScript** | Type safety | 4.x |
| **Refine** | CRUD framework | 3.x (@pankod/refine) |
| **Material UI (MUI)** | Component library | 5.x |
| **ApexCharts** | Data visualization | Latest |
| **React Router v6** | Client-side routing | 6.x |
| **Axios** | HTTP client | Latest |
| **Google OAuth** | Authentication | react-google-login |

### Backend (Server)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | 14.x+ |
| **Express.js** | Web framework | 4.x |
| **MongoDB** | NoSQL database | Latest |
| **Mongoose** | MongoDB ODM | 6.x |
| **dotenv** | Environment variables | Latest |
| **cors** | Cross-origin resource sharing | Latest |
| **Cloudinary** | Image upload/storage | Latest |

### DevOps & Deployment

| Platform | Purpose |
|----------|---------|
| **Vercel** | Frontend hosting (React app) |
| **GitHub Pages** | Alternative frontend hosting |
| **Render** | Backend hosting (Node.js API) |
| **MongoDB Atlas** | Cloud database hosting |
| **GitHub Actions** | CI/CD pipeline |

---

## Application Layers

### 1. Presentation Layer (Frontend)

**Location:** `/client/src/`

**Responsibilities:**
- User interface rendering
- User input handling
- API requests to backend
- Client-side routing
- State management
- Data visualization

**Key Components:**
- `App.tsx` – Main application entry, Refine setup, routing configuration
- `pages/` – Page components (Home, Project, Timeline, KIPs, etc.)
- `components/` – Reusable UI components
- `contexts/` – React Context providers (ColorMode, Pane)

**Framework: Refine**
- Built on top of React
- Provides `dataProvider` for CRUD operations
- Handles authentication via `authProvider`
- Manages routing via `routerProvider`

### 2. API Layer (Backend)

**Location:** `/server/`

**Responsibilities:**
- RESTful API endpoints
- Request validation
- Business logic execution
- Database operations
- Error handling
- CORS policy enforcement

**Key Files:**
- `index.js` – Express server setup, middleware, route registration
- `routes/` – API route definitions
- `controllers/` – Request handlers and business logic

### 3. Data Layer (Database)

**Location:** `/server/mongodb/`

**Responsibilities:**
- Data persistence
- Schema validation
- Data integrity
- Query optimization

**Key Files:**
- `connect.js` – MongoDB connection logic
- `models/` – Mongoose schemas (User, Property)

---

## Data Flow

### Complete Request-Response Cycle

```
1. USER ACTION (Frontend)
   ↓
2. REACT COMPONENT triggers action (e.g., "Get all projects")
   ↓
3. REFINE dataProvider makes API call
   Example: GET https://pct-dashboard.onrender.com/api/v1/properties
   ↓
4. BROWSER sends HTTP request with:
   - Method: GET
   - Headers: Content-Type, Origin
   - Query params (if any)
   ↓
5. REQUEST arrives at EXPRESS SERVER (server/index.js)
   ↓
6. CORS MIDDLEWARE checks origin
   - Allowed: vercel.app, github.io, localhost:3000
   - Rejects if not allowed
   ↓
7. ROUTING MIDDLEWARE matches path
   /api/v1/properties → propertyRouter
   ↓
8. ROUTE HANDLER (routes/property.routes.js)
   router.get('/', getAllProperties)
   ↓
9. CONTROLLER (controllers/property.controller.js)
   - Executes business logic
   - Calls Mongoose model: Property.find()
   ↓
10. MONGOOSE queries MONGODB ATLAS
    - Connects via connection string (MONGODB_URL)
    - Executes query on 'properties' collection
    ↓
11. MONGODB returns data
    ↓
12. CONTROLLER formats response
    res.status(200).json(properties)
    ↓
13. EXPRESS sends HTTP response
    ↓
14. REFINE receives response
    - Updates internal state
    - Triggers re-render
    ↓
15. REACT COMPONENT updates UI
    - Displays data in tables/charts
```

### Example: Creating a New Project

**Frontend (client/src/pages/create-property.tsx):**
```typescript
// User fills form and clicks "Submit"
const handleSubmit = async (data) => {
  const response = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      email: user.email,
      // ... other fields
    })
  });
};
```

**Backend (server/routes/property.routes.js):**
```javascript
router.post('/', createProperty);
```

**Controller (server/controllers/property.controller.js):**
```javascript
const createProperty = async (req, res) => {
  const { title, description, email } = req.body;
  
  // Find user
  const user = await User.findOne({ email });
  
  // Create property
  const newProperty = await Property.create({
    title,
    description,
    creator: user._id,
  });
  
  // Update user's properties
  user.allProperties.push(newProperty._id);
  await user.save();
  
  res.status(200).json({ message: 'Property created' });
};
```

**Database:**
- New document inserted into `properties` collection
- User's `allProperties` array updated with new property ID

---

## Authentication Flow

### Google OAuth Flow

```
1. USER clicks "Sign in with Google" (Login page)
   ↓
2. GOOGLE OAUTH POPUP opens
   - User selects Google account
   - Google returns credential (JWT token)
   ↓
3. FRONTEND receives credential
   - Decodes JWT to get user info (name, email, avatar)
   ↓
4. FRONTEND sends POST to /api/v1/users
   Body: { name, email, avatar }
   ↓
5. BACKEND receives request (user.controller.js)
   ↓
6. CONTROLLER checks if user exists
   const user = await User.findOne({ email });
   
   If NOT exists:
   - Create new user in database
   - Return user data
   
   If exists:
   - Return existing user data
   ↓
7. FRONTEND receives user data
   - Stores in localStorage as "user"
   - authProvider.login() resolves
   - Redirects to Dashboard
   ↓
8. USER is logged in
   - All subsequent requests include user email
   - authProvider.check() validates localStorage
```

### Demo Login Flow (No Google)

```
1. USER clicks "Continue as Demo User"
   ↓
2. FRONTEND sends GET to /api/v1/users
   ↓
3. BACKEND returns all users
   ↓
4. FRONTEND picks first user (index 0)
   - Stores demo user in localStorage
   - Redirects to Dashboard
```

### Authentication State Management

**Location:** `client/src/App.tsx` (authProvider)

```typescript
const authProvider: AuthProvider = {
  login: async ({ credential }) => {
    // Handle Google OAuth or Demo login
    // Store user in localStorage
  },
  
  logout: async () => {
    // Remove user from localStorage
    // Redirect to login page
  },
  
  checkAuth: async () => {
    // Check if user exists in localStorage
    // If not, reject (redirect to login)
  },
  
  checkError: () => Promise.resolve(),
  
  getPermissions: () => Promise.resolve(),
  
  getUserIdentity: async () => {
    // Retrieve user from localStorage
    // Used to display user name in header
  },
};
```

---

## API Architecture

### Base URL

**Production:**
- Frontend (Vercel): `https://pct-dashboard-xi.vercel.app`
- Frontend (GitHub Pages): `https://nikhil12121.github.io/pct-dashboard/`
- Backend (Render): `https://pct-dashboard.onrender.com/api/v1`

**Local Development:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080/api/v1`

### API Endpoints

#### Users API (`/api/v1/users`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/v1/users` | Get all users | - | `[{ _id, name, email, avatar, allProperties }]` |
| GET | `/api/v1/users/:id` | Get user by ID | - | `{ _id, name, email, avatar, allProperties }` |
| POST | `/api/v1/users` | Create/login user | `{ name, email, avatar }` | `{ _id, name, email, avatar }` |

#### Properties API (`/api/v1/properties`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/v1/properties` | Get all properties | - | `[{ _id, title, description, ... }]` |
| GET | `/api/v1/properties/:id` | Get property by ID | - | `{ _id, title, description, creator: {...} }` |
| POST | `/api/v1/properties` | Create property | `{ title, description, propertyType, location, price, photo, email }` | `{ message: 'Property created' }` |
| PATCH | `/api/v1/properties/:id` | Update property | `{ title, description, ... }` | `{ message: 'Property updated' }` |
| DELETE | `/api/v1/properties/:id` | Delete property | - | `{ message: 'Property deleted' }` |

### CORS Configuration

**Location:** `server/index.js`

```javascript
const allowedOrigins = [
  'https://pct-dashboard-xi.vercel.app',  // Vercel deployment
  'http://localhost:3000',                 // Local development
];

app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||     // Any Vercel preview
      origin.endsWith('.github.io');        // GitHub Pages
    callback(null, allowed);
  },
  credentials: true,
}));
```

**Why CORS is needed:**
- Frontend and backend run on different domains
- Browser security blocks cross-origin requests by default
- CORS headers tell browser to allow requests from specific origins

---

## Database Schema

### MongoDB Connection

**Connection String Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>
```

**Current:**
```
mongodb+srv://nikhil:test@clusterpct.aastvto.mongodb.net/?appName=Clusterpct
```

**Connection Logic:** `server/mongodb/connect.js`

```javascript
import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000,  // 30s timeout
      connectTimeoutMS: 30000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    throw error;
  }
};
```

### Collections

#### 1. Users Collection

**Schema:** `server/mongodb/models/user.js`

```javascript
{
  _id: ObjectId,              // Auto-generated
  name: String,               // User's full name
  email: String,              // User's email (unique)
  avatar: String,             // Profile picture URL
  allProperties: [ObjectId],  // References to Property documents
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Nikhil Bhosale",
  "email": "nikhil@example.com",
  "avatar": "https://lh3.googleusercontent.com/...",
  "allProperties": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ]
}
```

#### 2. Properties Collection

**Schema:** `server/mongodb/models/property.js`

```javascript
{
  _id: ObjectId,           // Auto-generated
  title: String,           // Project name
  description: String,     // Project description
  propertyType: String,    // Project type/category
  location: String,        // Project location
  price: Number,           // Budget/cost
  photo: String,           // Project image URL
  creator: ObjectId,       // Reference to User document
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "MRTX-001 Phase 2 Trial",
  "description": "Clinical trial for oncology drug",
  "propertyType": "Clinical Trial",
  "location": "Global",
  "price": 5000000,
  "photo": "https://res.cloudinary.com/...",
  "creator": "507f1f77bcf86cd799439011"
}
```

### Relationships

```
User (1) ←→ (Many) Properties

- User has array of property IDs: user.allProperties
- Property has reference to creator: property.creator

When fetching property details:
Property.findById(id).populate('creator')
  → Returns property with full creator object instead of just ID
```

---

## Deployment Architecture

### Current Production Setup

```
┌────────────────────────────────────────────────────────────┐
│                         USERS                               │
│              Browser (Chrome, Safari, etc.)                 │
└────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┴───────────────────┐
        ↓                                       ↓
┌────────────────────┐              ┌────────────────────┐
│  VERCEL (Primary)  │              │  GITHUB PAGES      │
│  Frontend Hosting  │              │  (Alternative)     │
│                    │              │                    │
│  pct-dashboard-    │              │  nikhil12121.      │
│  xi.vercel.app     │              │  github.io/        │
│                    │              │  pct-dashboard/    │
│  - Static files    │              │  - Static files    │
│  - React SPA       │              │  - React SPA       │
│  - CDN delivery    │              │  - Free hosting    │
└────────────────────┘              └────────────────────┘
        ↓                                       ↓
        └───────────────────┬───────────────────┘
                            ↓
               ┌─────────────────────────┐
               │   RENDER.COM            │
               │   Backend Hosting       │
               │                         │
               │   pct-dashboard.        │
               │   onrender.com          │
               │                         │
               │   - Node.js runtime     │
               │   - Express API         │
               │   - Auto-restart        │
               │   - Free tier           │
               └─────────────────────────┘
                            ↓
               ┌─────────────────────────┐
               │   MONGODB ATLAS         │
               │   Database Hosting      │
               │                         │
               │   clusterpct.           │
               │   aastvto.mongodb.net   │
               │                         │
               │   - Cloud database      │
               │   - Auto-backups        │
               │   - Free tier (512MB)   │
               └─────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                        │
│                                                             │
│  Google OAuth: accounts.google.com                         │
│  Cloudinary: cloudinary.com (optional)                     │
└────────────────────────────────────────────────────────────┘
```

### Deployment Pipeline

#### Frontend (Vercel)

**Manual Deployment:**
1. Push code to GitHub main branch
2. Vercel auto-detects changes
3. Runs build: `npm run build` in `client/` directory
4. Deploys static files to CDN
5. Live in ~1-2 minutes

**Configuration:** `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "framework": "create-react-app"
}
```

#### Frontend (GitHub Pages)

**Automated via GitHub Actions:**

**Trigger:** Push to `main` branch

**Workflow:** `.github/workflows/deploy.yml`

**Steps:**
1. Checkout code
2. Set up Node.js
3. Install dependencies: `npm ci`
4. Build app: `npm run build`
   - Sets environment variables:
     - `REACT_APP_API_URL`
     - `REACT_APP_GOOGLE_CLIENT_ID`
5. Create 404.html redirect for SPA routing
6. Deploy to `gh-pages` branch
7. GitHub Pages serves from `gh-pages`

**Build time:** ~1-2 minutes

#### Backend (Render)

**Manual Deployment:**
1. Push code to GitHub
2. Render auto-detects changes
3. Runs build: `npm install` in `server/` directory
4. Starts server: `npm start`
5. Live in ~2-3 minutes

**Configuration (Render Dashboard):**
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `MONGODB_URL`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

**Auto-restart:**
- Render keeps server running 24/7
- Cold start on first request after inactivity (~30s delay)

---

## Environment Configuration

### Frontend Environment Variables

**File:** `client/.env` (local) or `client/.env.production` (production)

```bash
# API endpoint for backend
REACT_APP_API_URL=https://pct-dashboard.onrender.com/api/v1

# Google OAuth Client ID
REACT_APP_GOOGLE_CLIENT_ID=1087553985957-mhu7satkhqsj7u21tqaq893nc0tcn7dd.apps.googleusercontent.com
```

**Usage in code:**
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
```

**Important:**
- Variables MUST start with `REACT_APP_` to be accessible in React
- Set in Vercel dashboard for Vercel deployment
- Set in GitHub Actions workflow for GitHub Pages
- Baked into build at compile time (not changeable after build)

### Backend Environment Variables

**File:** `server/.env` (local) or Render dashboard (production)

```bash
# MongoDB connection string
MONGODB_URL=mongodb+srv://nikhil:test@clusterpct.aastvto.mongodb.net/?appName=Clusterpct

# Cloudinary credentials (optional for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server port (optional, defaults to 8080)
PORT=8080
```

**Usage in code:**
```javascript
import * as dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL;
```

---

## File Structure

```
pct-dashboard/
├── client/                          # Frontend (React app)
│   ├── public/
│   │   ├── index.html              # HTML template
│   │   └── assets/                 # Static assets
│   ├── src/
│   │   ├── App.tsx                 # Main app component, Refine config
│   │   ├── index.tsx               # React entry point
│   │   ├── pages/                  # Page components
│   │   │   ├── home.tsx            # Dashboard overview
│   │   │   ├── project.tsx         # Project details
│   │   │   ├── timeline.tsx        # Gantt chart view
│   │   │   ├── kips.tsx            # Key Inflection Points
│   │   │   ├── milestones.tsx     # Milestone tracking
│   │   │   ├── cost-fte.tsx       # Cost/FTE analysis
│   │   │   ├── risks.tsx          # Risk management
│   │   │   ├── terminated.tsx     # Terminated projects
│   │   │   └── login.tsx          # Login page
│   │   ├── components/             # Reusable components
│   │   │   ├── layout/            # Layout components
│   │   │   │   ├── PCTLayout.tsx  # Main layout wrapper
│   │   │   │   ├── PCTSider.tsx   # Sidebar navigation
│   │   │   │   ├── PCTNavPane.tsx # Navigation pane
│   │   │   │   └── header/        # Header component
│   │   │   ├── pct/               # PCT-specific components
│   │   │   │   ├── PCTKPICard.tsx # KPI cards
│   │   │   │   ├── PCTProgressBar.tsx
│   │   │   │   ├── PCTProjectsTimeline.tsx
│   │   │   │   └── PageWithFilters.tsx
│   │   │   ├── charts/            # Chart components
│   │   │   └── common/            # Common components
│   │   │       ├── CustomError.tsx # Custom 404 page
│   │   │       └── ...
│   │   ├── contexts/              # React contexts
│   │   │   ├── ColorModeContext.tsx
│   │   │   └── PaneContext.tsx
│   │   ├── interfaces/            # TypeScript interfaces
│   │   ├── utils/                 # Utility functions
│   │   └── assets/                # Images, icons
│   ├── .env                       # Local environment variables
│   ├── .env.production            # Production env vars (committed)
│   ├── package.json               # Dependencies
│   └── tsconfig.json              # TypeScript config
│
├── server/                         # Backend (Node.js API)
│   ├── mongodb/
│   │   ├── connect.js             # MongoDB connection logic
│   │   └── models/
│   │       ├── user.js            # User schema
│   │       └── property.js        # Property schema
│   ├── routes/
│   │   ├── user.routes.js         # User API routes
│   │   └── property.routes.js     # Property API routes
│   ├── controllers/
│   │   ├── user.controller.js     # User business logic
│   │   └── property.controller.js # Property business logic
│   ├── index.js                   # Express server entry point
│   ├── .env                       # Environment variables (not committed)
│   └── package.json               # Dependencies
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions CI/CD
│
├── README.md                      # Project overview
├── ARCHITECTURE.md                # This file
├── SETUP.md                       # Local setup guide
├── DEPLOY_AND_SHARE.md           # Deployment instructions
└── vercel.json                    # Vercel configuration
```

---

## How Everything Connects

### Initialization Flow

**1. User visits app URL**
```
https://pct-dashboard-xi.vercel.app/
```

**2. Vercel serves `index.html`**
- Loads React bundle (`main.js`)
- React mounts to DOM

**3. React Router checks current path**
- If not authenticated → Redirects to `/login`
- If authenticated → Loads requested page

**4. User logs in**
- Google OAuth flow OR Demo login
- POST request to backend `/api/v1/users`
- Backend checks/creates user in MongoDB
- Frontend stores user in localStorage

**5. User navigates to Home page**
- React renders `pages/home.tsx`
- Component calls Refine's `useList()` hook
- Hook calls dataProvider
- dataProvider makes GET request to `/api/v1/properties`

**6. Backend receives request**
- CORS middleware validates origin
- Routes to `property.routes.js`
- Calls `getAllProperties()` controller
- Controller queries MongoDB via Mongoose
- Returns JSON response

**7. Frontend receives data**
- Refine updates component state
- React re-renders with data
- ApexCharts visualizes data

**8. User interacts (e.g., creates project)**
- Fills form, clicks Submit
- POST request to `/api/v1/properties`
- Backend creates document in MongoDB
- Returns success response
- Frontend shows success notification
- List refreshes with new data

---

## Key Design Decisions

### Why MERN Stack?

- **M**ongoDB: Flexible schema for evolving pharma data
- **E**xpress: Lightweight, fast API development
- **R**eact: Component-based UI, rich ecosystem
- **N**ode.js: JavaScript everywhere, shared types

### Why Refine Framework?

- Pre-built CRUD hooks (`useList`, `useCreate`, etc.)
- Built-in authentication scaffolding
- Material UI integration out-of-the-box
- Reduces boilerplate by ~70%

### Why Separate Hosting?

- **Frontend (Vercel/GitHub Pages):** Static files, CDN, fast global delivery
- **Backend (Render):** Dynamic API, environment variables, database access
- **Separation of concerns:** Scale independently

### Why MongoDB Atlas?

- Cloud-hosted, no server management
- Free tier suitable for small projects
- Easy connection from any platform
- Built-in backups and monitoring

---

## Common Questions

### Q: How does the frontend know where the backend is?

**A:** Environment variable `REACT_APP_API_URL` is set during build:
- Vercel: Set in Vercel dashboard
- GitHub Pages: Set in GitHub Actions workflow
- Local: Set in `client/.env`

### Q: Why does the app show a blank page after deployment?

**A:** Common causes:
1. Wrong `REACT_APP_API_URL` (frontend can't reach backend)
2. Backend not running (check Render logs)
3. MongoDB connection failed (check credentials)
4. Browser cache (clear cache or use incognito)

### Q: How does authentication work without a user database?

**A:** We DO have a user database:
- Users collection in MongoDB
- When you log in with Google, we create/fetch your user document
- Demo login fetches an existing user

### Q: Can I use this app offline?

**A:** No, it requires:
- Internet connection to backend API
- Backend connection to MongoDB
- Google OAuth requires internet

### Q: How do I add a new page?

**A:**
1. Create page component: `client/src/pages/my-page.tsx`
2. Add resource in `App.tsx`:
   ```typescript
   {
     name: "my-page",
     list: MyPage,
     options: { label: "My Page" },
     icon: <MyIcon />,
   }
   ```
3. Create backend endpoint if needed: `server/routes/my-page.routes.js`

---

## Performance Considerations

### Frontend Optimization

- Code splitting via React Router
- Image lazy loading
- ApexCharts only load on dashboard
- Material UI tree-shaking

### Backend Optimization

- MongoDB indexes on frequently queried fields (email, _id)
- Mongoose query population only when needed
- Express.json() with 50MB limit for large payloads

### Database Optimization

- Connection pooling via Mongoose
- 30s timeout for cold starts
- Await connection before accepting requests

---

## Security Considerations

### Frontend

- Google OAuth for authentication (secure token-based)
- No sensitive data in localStorage (only user name/email)
- HTTPS only in production (Vercel/GitHub Pages enforce)

### Backend

- CORS restricts API access to allowed origins
- Environment variables for secrets (never in code)
- MongoDB connection string includes password (keep secret)

### Database

- MongoDB Atlas network access control (whitelist IPs)
- User credentials required for connection
- Encrypted connections (TLS/SSL)

---

## Troubleshooting Guide

### Problem: "Cannot reach backend"

**Cause:** Frontend can't connect to backend API

**Solution:**
1. Check `REACT_APP_API_URL` is set correctly
2. Verify backend is running (visit backend URL in browser)
3. Check CORS allows your frontend origin

### Problem: "Operation buffering timed out"

**Cause:** MongoDB connection failed or too slow

**Solution:**
1. Check `MONGODB_URL` is correct
2. Verify MongoDB Atlas network access allows connections
3. Check MongoDB cluster is running (not paused)

### Problem: "Google Sign-In fails with 403"

**Cause:** Frontend origin not authorized in Google Cloud Console

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Edit OAuth client
3. Add frontend URL to Authorized JavaScript origins

### Problem: GitHub Pages shows README instead of app

**Cause:** GitHub Pages source set to wrong branch/folder

**Solution:**
1. Go to repo Settings → Pages
2. Set source to `gh-pages` branch, root directory

---

## Next Steps

- **Add real-time updates:** Integrate Socket.io for live data
- **Add notifications:** Email alerts for milestones
- **Improve performance:** Add caching layer (Redis)
- **Add tests:** Unit tests (Jest), E2E tests (Cypress)
- **Custom domain:** Configure DNS for custom domain

---

## Resources

- **Refine Docs:** https://refine.dev/docs/
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Material UI:** https://mui.com/material-ui/
- **ApexCharts:** https://apexcharts.com/docs/

---

**Documentation Version:** 1.0  
**Last Updated:** February 2026  
**Author:** Nikhil Bhosale
