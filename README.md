# Mini Project Manager

A production ready full stack project management application with smart task scheduling capabilities. Built with .NET 8, React, TypeScript, and deployed on Render and Vercel.

## 🌐 Live Application (Bonus Task)

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
- **Smart Scheduler**: Algorithmic task ordering based on dependencies, due dates, and estimated hours
- **Real time Validation**: Client and server side validation with detailed error messages
- **Secure API**: JWT based authentication, CORS protection, and ownership validation

## 🛠️ Tech Stack

### Backend
- **.NET 8 Web API**: Modern, high performance REST API
- **Entity Framework Core 8**: ORM for database operations
- **SQLite**: Lightweight database (dev/production)
- **JWT Bearer Authentication**: Secure token based auth
- **BCrypt.Net**: Password hashing
- **Swashbuckle**: OpenAPI/Swagger documentation

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type safe JavaScript
- **Vite**: Fast build tool and dev server
- **React Router**: Client side routing
- **TanStack Query (React Query)**: Data fetching and caching
- **React Hook Form + Zod**: Form handling and validation
- **Axios**: HTTP client
- **Tailwind CSS**: Utility first CSS framework

### DevOps
- **Render**: Backend hosting
- **Vercel**: Frontend hosting

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
JWT__Key=put your secret key here
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











