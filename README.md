# Mini Project Manager

A production-ready full-stack project management application with smart task scheduling capabilities. Built with .NET 8, React, TypeScript, and deployed on Render and Vercel.

## 🌐 Live Application

- **Frontend**: [https://appsian-project-manager-1s3u.vercel.app](https://appsian-project-manager-1s3u.vercel.app)
- **Backend API**: [https://project-manager-api-st7h.onrender.com](https://project-manager-api-st7h.onrender.com)
- **API Health Check**: [https://project-manager-api-st7h.onrender.com/healthz](https://project-manager-api-st7h.onrender.com/healthz)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)

## ✨ Features

- **JWT Authentication**: Secure user registration and login with BCrypt password hashing
- **Project Management**: Create, view, and delete projects with full CRUD operations
- **Task Management**: Add, update, complete, and delete tasks with due dates
- **Smart Scheduler**: AI-powered task ordering based on dependencies, due dates, and estimated hours
- **Responsive UI**: Mobile-friendly interface built with React and Tailwind CSS
- **Real-time Validation**: Client and server-side validation with detailed error messages
- **Secure API**: JWT-based authentication, CORS protection, and ownership validation

## 🛠️ Tech Stack

### Backend
- **.NET 8 Web API**: Modern, high-performance REST API
- **Entity Framework Core 8**: ORM for database operations
- **SQLite**: Lightweight database (dev/production)
- **JWT Bearer Authentication**: Secure token-based auth
- **BCrypt.Net**: Password hashing
- **Swashbuckle**: OpenAPI/Swagger documentation

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **TanStack Query (React Query)**: Data fetching and caching
- **React Hook Form + Zod**: Form handling and validation
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework

### DevOps
- **Render**: Backend hosting
- **Vercel**: Frontend hosting
- **GitHub Actions**: CI/CD pipeline
- **Docker**: Containerization

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              User's Browser                      │
└────────────────┬────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────┐
│         Vercel (Frontend - React)               │
│    https://appsian-project-manager-1s3u         │
│              .vercel.app                        │
└────────────────┬────────────────────────────────┘
                 │ API Calls (HTTPS)
                 ▼
┌─────────────────────────────────────────────────┐
│      Render (Backend - .NET 8 API)              │
│   https://project-manager-api-st7h              │
│           .onrender.com                         │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│        SQLite Database (Persistent)             │
│           /data/projectmanager.db               │
└─────────────────────────────────────────────────┘
```

## 🚀 Running Locally

### Prerequisites

Make sure you have the following installed:
- **.NET 8 SDK**: [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Git**: For cloning the repository

### Quick Start (One Command)

```bash
# Clone the repository
git clone https://github.com/abhisheksinha763/appsian-project-manager.git
cd appsian-project-manager

# Install dependencies and start both backend and frontend
npm install
npm run dev
```

**This will start:**
- ✅ Backend API at `http://localhost:5000`
- ✅ Frontend at `http://localhost:5173`
- ✅ Swagger UI at `http://localhost:5000/swagger`

### Manual Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/abhisheksinha763/appsian-project-manager.git
cd appsian-project-manager
```

#### Step 2: Setup Backend
```bash
# Navigate to server directory
cd server

# Restore dependencies
dotnet restore

# Initialize database
dotnet ef database update --project ProjectManager.Api

# Run the backend
dotnet run --project ProjectManager.Api
```

Backend will be available at `http://localhost:5000`

#### Step 3: Setup Frontend

Open a new terminal:

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### First Time Usage

1. Open `http://localhost:5173` in your browser
2. Click **"Create a new account"**
3. Register with an email and password
4. Start creating projects and tasks!

### Build for Production

```bash
# Build both backend and frontend
npm run build

# Or build individually:

# Backend
cd server
dotnet publish -c Release -o out

# Frontend
cd web
npm run build
```

## 🔧 Environment Variables

### Server (.NET)
```bash
JWT__Key=your-secret-key-min-32-chars-long
ConnectionStrings__Default=Data Source=projectmanager.db
ASPNETCORE_URLS=http://localhost:5000
ASPNETCORE_ENVIRONMENT=Development
```

### Web (React)
```bash
VITE_API_BASE_URL=http://localhost:5000
```

## 📚 API Documentation

### Authentication

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### Projects

#### List Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "Project description here"
  }'
```

#### Get Project
```bash
curl -X GET http://localhost:5000/api/projects/{projectId} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/{projectId} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Tasks

#### Create Task
```bash
curl -X POST http://localhost:5000/api/projects/{projectId}/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement feature X",
    "dueDate": "2025-10-30"
  }'
```

#### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/{taskId} \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task title",
    "dueDate": "2025-11-01",
    "isCompleted": true
  }'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/{taskId} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Smart Scheduler

#### Generate Task Schedule
```bash
curl -X POST http://localhost:5000/api/v1/projects/{projectId}/schedule \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tasks": [
      {
        "title": "Design API",
        "estimatedHours": 5,
        "dueDate": "2025-10-25",
        "dependencies": []
      },
      {
        "title": "Implement Backend",
        "estimatedHours": 12,
        "dueDate": "2025-10-28",
        "dependencies": ["Design API"]
      },
      {
        "title": "Build Frontend",
        "estimatedHours": 10,
        "dueDate": "2025-10-30",
        "dependencies": ["Design API"]
      },
      {
        "title": "End-to-End Test",
        "estimatedHours": 8,
        "dueDate": "2025-10-31",
        "dependencies": ["Implement Backend", "Build Frontend"]
      }
    ]
  }'
```

Response:
```json
{
  "recommendedOrder": [
    "Design API",
    "Implement Backend",
    "Build Frontend",
    "End-to-End Test"
  ]
}
```

## 🗄️ Database Schema

See `/docs/erd.png` for the entity relationship diagram.

**Entities:**
- **User**: Id, Email, PasswordHash, CreatedAt
- **Project**: Id, UserId, Title, Description, CreatedAt
- **TaskItem**: Id, ProjectId, Title, DueDate, IsCompleted, CreatedAt

**Relationships:**
- User 1→* Projects
- Project 1→* TaskItems

## 🧪 Testing

### Backend Tests
```bash
cd server/ProjectManager.Tests
dotnet test
```

Tests include:
- Authentication service (password hashing/verification)
- Ownership validation
- Smart scheduler (DAG detection, topological sort, tie-breakers)

### Frontend Tests
```bash
cd web
npm run test
```

Tests include:
- Auth form validation
- Project creation flow
- Scheduler modal rendering

## 🚀 Deployment

This application is deployed using **Render** (backend) and **Vercel** (frontend) with automated CI/CD via GitHub Actions.

### Live Deployment

- **Production Frontend**: [https://appsian-project-manager-1s3u.vercel.app](https://appsian-project-manager-1s3u.vercel.app)
- **Production Backend**: [https://project-manager-api-st7h.onrender.com](https://project-manager-api-st7h.onrender.com)

### Deployment Architecture

```
GitHub Repository (main branch)
         │
         ├─── Push to main
         │
         ▼
┌─────────────────────┐
│  GitHub Actions     │
│  (CI/CD Pipeline)   │
└─────────┬───────────┘
          │
          ├──────────────┬──────────────┐
          ▼              ▼              ▼
    Run Tests    Deploy Backend  Deploy Frontend
                       │              │
                       ▼              ▼
                  ┌─────────┐   ┌──────────┐
                  │ Render  │   │ Vercel   │
                  └─────────┘   └──────────┘
```

### Backend Deployment (Render)

**Platform**: [Render](https://render.com)

**Configuration**:
- **Service Type**: Web Service (Docker)
- **Region**: Auto-selected
- **Instance Type**: Free tier (with sleep after inactivity)
- **Environment Variables**:
  - `ASPNETCORE_ENVIRONMENT=Production`
  - `ASPNETCORE_URLS=http://0.0.0.0:5000`
  - `JWT__Key=<auto-generated-secure-key>`
  - `ConnectionStrings__Default=Data Source=/data/projectmanager.db`
- **Persistent Disk**: 1GB mounted at `/data` for SQLite database
- **Health Check**: `/healthz` endpoint

**Deployment File**: `render.yaml` in root directory

**How it works**:
1. Push to main branch triggers deployment
2. Render builds Docker image using `infra/Dockerfile.server`
3. Deploys to production with health checks
4. Database persists on disk volume

### Frontend Deployment (Vercel)

**Platform**: [Vercel](https://vercel.com)

**Configuration**:
- **Framework**: Vite
- **Root Directory**: `web`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_BASE_URL=https://project-manager-api-st7h.onrender.com`

**How it works**:
1. Push to main branch triggers deployment
2. Vercel builds React app with Vite
3. Deploys to global CDN
4. Automatic HTTPS and caching

### CI/CD Pipeline

Every push to the `main` branch triggers:

1. **Test Phase**:
   - ✅ Run backend tests (.NET)
   - ✅ Run frontend tests (React)
   - ✅ Security vulnerability scan

2. **Deploy Phase** (only if tests pass):
   - 🚀 Deploy backend to Render
   - 🚀 Deploy frontend to Vercel
   - 📢 Send deployment notifications

**GitHub Actions Workflows**:
- `.github/workflows/deploy.yml` - Main deployment pipeline
- `.github/workflows/ci.yml` - CI checks for pull requests

### How to Deploy Your Own

#### Step 1: Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/appsian-project-manager.git
cd appsian-project-manager
```

#### Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and configure automatically
5. Click **"Apply"**
6. Wait 5-10 minutes for deployment
7. Copy your backend URL (e.g., `https://your-api.onrender.com`)

#### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your Render backend URL from Step 2
5. Click **"Deploy"**
6. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

#### Step 4: Update CORS

1. Edit `server/ProjectManager.Api/appsettings.json`
2. Add your Vercel URL to `AllowedOrigins`:
   ```json
   "AllowedOrigins": [
     "http://localhost:5173",
     "https://your-app.vercel.app"
   ]
   ```
3. Commit and push - Render will auto-redeploy

#### Step 5: Setup CI/CD (Optional)

1. Get Render deploy hook: Render → Settings → Deploy Hook
2. Get Vercel credentials:
   ```bash
   npm install -g vercel
   vercel login
   cd web && vercel link
   cat .vercel/project.json
   ```
3. Add GitHub secrets:
   - `RENDER_DEPLOY_HOOK_URL`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

Now every push to main will automatically deploy!

### Environment Variables

#### Backend (Render)
```bash
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://0.0.0.0:5000
JWT__Key=<your-secret-key-min-32-chars>
ConnectionStrings__Default=Data Source=/data/projectmanager.db
```

#### Frontend (Vercel)
```bash
VITE_API_BASE_URL=https://project-manager-api-st7h.onrender.com
```

### Monitoring & Logs

**Backend Logs** (Render):
- Dashboard → Your Service → Logs
- Real-time logs and deployment history

**Frontend Logs** (Vercel):
- Dashboard → Your Project → Deployments → Click deployment
- Build logs and runtime logs

**Health Check**:
```bash
curl https://project-manager-api-st7h.onrender.com/healthz
```

## 📖 Additional Resources

### API Documentation
- **Swagger UI** (Local): `http://localhost:5000/swagger`
- **OpenAPI Spec**: `/docs/openapi.json`
- **Postman Collection**: `/docs/postman_collection.json`

### Database
- **Entity Relationship Diagram**: `/docs/erd.png`
- **Migrations**: `server/ProjectManager.Api/Migrations/`

### Infrastructure
- **Docker Files**: `/infra/` directory
  - `Dockerfile.server` - Backend container
  - `Dockerfile.web` - Frontend container
  - `nginx.conf` - Nginx configuration
- **Deployment Configs**:
  - `render.yaml` - Render Blueprint
  - `vercel.json` - Vercel configuration
  - `docker-compose.yml` - Local Docker setup

### Project Structure
```
appsian-project-manager/
├── server/                      # .NET 8 Backend
│   ├── ProjectManager.Api/      # Main API project
│   └── ProjectManager.Tests/    # Unit tests
├── web/                         # React Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom hooks
│   │   └── lib/                 # Utilities
│   └── public/                  # Static assets
├── infra/                       # Infrastructure configs
├── docs/                        # Documentation
└── .github/workflows/           # CI/CD pipelines
```

## 🔒 Security Features

- **Authentication**: JWT-based with HS256 signing
- **Password Security**: BCrypt hashing with salt
- **Authorization**: Per-request ownership validation
- **CORS Protection**: Configured allowed origins only
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: EF Core parameterized queries
- **HTTPS**: Enforced on production deployments
- **Rate Limiting**: Configured on authentication endpoints

## 📝 License

MIT

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
