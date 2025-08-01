# 🐳 Docker Deployment Guide

This guide helps you deploy the Phillip Trustee Website on a new laptop using Docker.

## Prerequisites

- **Docker Desktop** installed and running
- **Git** installed
- That's it! No Node.js, npm, or PostgreSQL needed.

## Quick Start (3 Steps)

### 1. Clone the Repository

```bash
git clone https://github.com/nasa-earth/Phillip-Trustee-Website.git
cd Phillip-Trustee-Website
```

### 2. Run Docker Setup (Choose One)

**Option A: Automated Script (Windows)**

```powershell
.\docker-setup.ps1
```

**Option B: Manual Command**

```bash
docker-compose up --build -d
```

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3005/api
- **API Documentation:** http://localhost:3005/api/docs

## What Gets Set Up

- 🐘 **PostgreSQL Database** (automatically configured)
- 🔧 **Backend API** (NestJS with Prisma ORM)
- 🚀 **Frontend App** (Nuxt.js Vue application)
- 🔗 **Networking** (all services connected)
- 💾 **Persistent Storage** (data survives container restarts)

## Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres

# Restart a service
docker-compose restart backend

# Rebuild everything
docker-compose up --build --force-recreate

# Clean up everything (including data)
docker-compose down -v
```

## Troubleshooting

### Services won't start

```bash
# Check what's wrong
docker-compose logs

# Full reset
docker-compose down -v
docker-compose up --build
```

### Port conflicts

If ports 3000, 3005, or 5432 are in use:

```bash
# Windows: Check what's using ports
netstat -ano | findstr :3000
netstat -ano | findstr :3005

# Kill process using port (replace PID)
taskkill /PID <process-id> /F
```

### Docker not running

- Open Docker Desktop
- Wait for it to fully start
- Try the setup again

## Default Admin Access

Once running, you can access the admin panel with:

- **Email:** admin@example.com
- **Password:** admin123

## Support

If you encounter issues:

1. Check Docker Desktop is running
2. Run `docker-compose logs` to see error messages
3. Try a full rebuild: `docker-compose down -v && docker-compose up --build`

---

**That's it! Your application should be running with minimal setup.** 🎉
