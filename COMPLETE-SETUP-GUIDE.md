# 🚀 Complete Setup Process for Phillip Trustee Website

Copy this entire guide and follow step by step. Each step includes expected outputs and troubleshooting.

## 📋 STEP 1: Prerequisites Check

### 1.1 Download and Install Required Software

**Node.js (Version 18.19.0 - EXACT VERSION REQUIRED):**

- Go to: https://nodejs.org/dist/v18.19.0/
- Download the installer for your operating system
- Install and restart your computer
- Verify: Open terminal/command prompt and run:

```bash
node --version
```

Expected output: `v18.19.0`

**PostgreSQL (Version 12 or higher):**

- Go to: https://www.postgresql.org/download/
- Download and install PostgreSQL
- During installation, remember your username (usually 'postgres') and password
- Verify: Open terminal and run:

```bash
postgres --version
```

Expected output: `postgres (PostgreSQL) 14.x` or higher

**Git:**

- Go to: https://git-scm.com/
- Download and install Git
- Verify: Open terminal and run:

```bash
git --version
```

Expected output: `git version 2.x.x`

---

## 📦 STEP 2: Clone the Repository

Open terminal/command prompt and run:

```bash
git clone https://github.com/nasa-earth/Phillip-Trustee-Website.git
cd Phillip-Trustee-Website
```

Expected output: Repository cloned successfully, and you're now in the project directory.

---

## 🔍 STEP 3: Environment Compatibility Check

Run the environment checker:

```bash
node check-environment.js
```

**Expected output:**

```
🔍 Environment Compatibility Check
==================================
Node.js: v18.19.0
✅ Node.js version is compatible
npm: 9.x.x
PostgreSQL: postgres (PostgreSQL) 14.x
✅ PostgreSQL found
Git: git version 2.x.x
✅ Git found
...
🎉 All checks passed! Your environment is ready.
```

**If you see errors:** Check VERSION-COMPATIBILITY.md file for solutions, or fix the specific issues mentioned.

---

## 🗄️ STEP 4: Database Setup

### 4.1 Start PostgreSQL Service

**Windows:**

- Search "Services" in Start menu
- Find "PostgreSQL" service and start it
- OR use pgAdmin if installed

**macOS:**

```bash
brew services start postgresql
```

**Linux:**

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4.2 Create Database

Open PostgreSQL command line (psql) or pgAdmin and run:

```sql
CREATE DATABASE "db-phillip-trustee-website";
```

**Alternative using command line:**

```bash
# Replace 'postgres' with your PostgreSQL username if different
createdb -U postgres db-phillip-trustee-website
```

---

## ⚡ STEP 5: Automated Setup (RECOMMENDED)

Choose your operating system:

### Windows (PowerShell):

```powershell
# Open PowerShell as Administrator and run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

### Linux/macOS (Terminal):

```bash
chmod +x setup.sh
./setup.sh
```

**Expected output from setup script:**

```
🚀 Starting Phillip Trustee Website Setup...
✅ Node.js found: v18.19.0
✅ npm found: 9.x.x
📦 Installing Backend Dependencies...
✅ Backend dependencies installed successfully
📦 Installing Frontend Dependencies...
✅ Frontend dependencies installed successfully
🔧 Setting up environment file...
📄 Template .env file created in backend directory.
⚠️  Please edit backend/.env and update the DATABASE_URL with your PostgreSQL credentials.
✅ Setup completed!
```

---

## 🔧 STEP 6: Configure Environment Variables

### 6.1 Edit Backend Environment File

Navigate to the backend folder and edit the `.env` file:

```bash
cd backend
```

Open `backend/.env` file in any text editor and update:

```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/db-phillip-trustee-website?schema=public"
JWT_SECRET="6890b62620572b2ee90b55f7d6344d2eaacfdcd49f006f5b5b115276d373eddb"
PORT=3005
```

**Replace:**

- `your_username` with your PostgreSQL username (usually 'postgres')
- `your_password` with your PostgreSQL password

**Example:**

```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/db-phillip-trustee-website?schema=public"
JWT_SECRET="6890b62620572b2ee90b55f7d6344d2eaacfdcd49f006f5b5b115276d373eddb"
PORT=3005
```

---

## 🗃️ STEP 7: Database Migration

Still in the backend directory, run:

```bash
npx prisma generate
npx prisma db push
```

**Expected output:**

```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Generated Prisma Client
...
🚀  Your database is now in sync with your schema.
```

---

## 📊 STEP 8: Verify Database Setup

Test the database connection:

```bash
node verify-events.js
```

**Expected output:**

```
🔍 Verifying events in database...
📊 Total Events Found: 0
📸 Total Event Images: 0
```

---

## 🌱 STEP 9: Seed Database (Optional)

Add sample data to your database:

```bash
node seed-events.js
node seed-faqs.js
node seed-partners.js
node create-admin-user.js
```

---

## 🚀 STEP 10: Start the Application

### 10.1 Start Backend Server

In the backend directory:

```bash
npm run start:dev
```

**Expected output:**

```
[Nest] Starting Nest application...
[Nest] NestApplication successfully started
Application is running on: http://localhost:3005
```

**Keep this terminal open!**

### 10.2 Start Frontend Server

Open a **NEW terminal/command prompt** and run:

```bash
cd Phillip-Trustee-Website/frontend
npm run dev
```

**Expected output:**

```
Nuxt 3.x.x with Nitro 2.x.x
Local:    http://localhost:3000/
Network:  http://192.168.x.x:3000/
```

**Keep this terminal open too!**

---

## ✅ STEP 11: Verify Everything Works

### 11.1 Test Frontend

Open your browser and go to: http://localhost:3000

- You should see the Phillip Trustee website

### 11.2 Test Backend API

Open your browser and go to: http://localhost:3005/api/health

- You should see a health check response

### 11.3 Test API Documentation

Go to: http://localhost:3005/api/docs

- You should see Swagger API documentation

---

## 🐛 STEP 12: Troubleshooting Common Issues

### Issue: "Port already in use"

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3005
# Kill the process using: taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
lsof -ti:3005 | xargs kill -9
```

### Issue: "Cannot connect to database"

1. Check if PostgreSQL is running
2. Verify DATABASE_URL in backend/.env
3. Ensure database "db-phillip-trustee-website" exists

### Issue: "Module not found" or dependency errors

```bash
# In both backend and frontend directories:
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Prisma Client not generated"

```bash
cd backend
npx prisma generate
```

---

## 🎯 STEP 13: Final Verification Checklist

Check all these points:

- [ ] ✅ Node.js version is 18.19.0: `node --version`
- [ ] ✅ PostgreSQL is running and accessible
- [ ] ✅ Database "db-phillip-trustee-website" exists
- [ ] ✅ Backend `.env` file has correct database credentials
- [ ] ✅ Backend runs without errors: http://localhost:3005/api/health
- [ ] ✅ Frontend runs without errors: http://localhost:3000
- [ ] ✅ API documentation loads: http://localhost:3005/api/docs
- [ ] ✅ Database verification script runs: `node verify-events.js`

---

## 🎉 SUCCESS!

If all steps completed successfully, you now have:

- ✅ **Frontend running on:** http://localhost:3000
- ✅ **Backend API running on:** http://localhost:3005/api
- ✅ **API Documentation on:** http://localhost:3005/api/docs
- ✅ **Database connected and ready**

## 📞 Getting Help

If you encounter issues:

1. **Check the error message** in your terminal
2. **Verify prerequisites** are correctly installed
3. **Run environment check** again: `node check-environment.js`
4. **Check specific troubleshooting** in VERSION-COMPATIBILITY.md file
5. **Try the Docker option** if manual setup fails: `docker-compose up --build`

---

**🎯 You're now ready to develop with the Phillip Trustee Website!**
