# 🚀 Phillip Trustee Website - Setup Guide

This guide will help you set up the Phillip Trustee Website project on a new laptop after cloning from GitHub.

## 📋 Prerequisites

Before you start, make sure you have the following installed on your laptop:

1. **Node.js** (version 18 or higher)

   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **PostgreSQL** (version 12 or higher)

   - Download from: https://www.postgresql.org/download/
   - Remember the username and password you set during installation

3. **Git**
   - Download from: https://git-scm.com/

## 🔧 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nasa-earth/Phillip-Trustee-Website.git
cd Phillip-Trustee-Website
```

### 2. Backend Setup

#### 2.1 Navigate to Backend Directory

```bash
cd backend
```

#### 2.2 Install Dependencies

```bash
npm install
```

#### 2.3 Set Up Environment Variables

Create a `.env` file in the backend directory with the following content:

```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/db-phillip-trustee-website?schema=public"
JWT_SECRET="6890b62620572b2ee90b55f7d6344d2eaacfdcd49f006f5b5b115276d373eddb"
PORT=3005
```

**⚠️ Important:** Replace `your_username` and `your_password` with your PostgreSQL credentials.

#### 2.4 Set Up PostgreSQL Database

1. **Create Database:**

   - Open PostgreSQL command line (psql) or pgAdmin
   - Create a new database named `db-phillip-trustee-website`

   Using psql:

   ```sql
   CREATE DATABASE "db-phillip-trustee-website";
   ```

2. **Run Prisma Migrations:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Verify Database Setup:**
   ```bash
   npx prisma studio
   ```
   This opens a web interface to view your database.

#### 2.5 Seed the Database (Optional)

If you want to populate the database with sample data:

```bash
# Seed events
node seed-events.js

# Seed FAQs
node seed-faqs.js

# Seed partners
node seed-partners.js

# Create admin user
node create-admin-user.js
```

### 3. Frontend Setup

#### 3.1 Navigate to Frontend Directory

```bash
cd ../frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

### 4. Running the Application

You have two options to run the application:

#### Option 1: Using VS Code Tasks (Recommended)

If you're using VS Code, you can use the predefined tasks:

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type "Tasks: Run Task"
4. Select either:
   - `🔧 Start Backend Dev Server`
   - `🚀 Start Frontend Dev Server`

#### Option 2: Manual Commands

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3005/api
- **API Documentation:** http://localhost:3005/api/docs (Swagger)

## 🔍 Verification

### Check if Backend is Running

Visit: http://localhost:3005/api/health

### Check if Frontend is Running

Visit: http://localhost:3000

### Verify Database Connection

Run the verification script:

```bash
cd backend
node verify-events.js
```

## 📁 Project Structure

```
Phillip-Trustee-Website/
├── backend/          # NestJS API server
│   ├── src/          # Source code
│   ├── prisma/       # Database schema and migrations
│   ├── uploads/      # File uploads storage
│   └── .env          # Environment variables
├── frontend/         # Nuxt.js application
│   ├── pages/        # Vue pages
│   ├── components/   # Vue components
│   └── assets/       # Static assets
└── README.md
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Error:**

   - Check if PostgreSQL is running
   - Verify DATABASE_URL in `.env` file
   - Ensure database exists

2. **Port Already in Use:**

   - Backend runs on port 3005
   - Frontend runs on port 3000
   - Make sure these ports are not being used by other applications

3. **Dependencies Installation Error:**

   - Clear node_modules: `rm -rf node_modules`
   - Clear npm cache: `npm cache clean --force`
   - Reinstall: `npm install`

4. **Prisma Issues:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Environment Variables Checklist

Make sure your backend `.env` file contains:

- ✅ DATABASE_URL (with correct PostgreSQL credentials)
- ✅ JWT_SECRET (for authentication)
- ✅ PORT (3005)

## 🔐 Default Admin User

If you ran the `create-admin-user.js` script, you can login with:

- **Email:** admin@example.com
- **Password:** admin123

## 📞 Support

If you encounter any issues during setup:

1. Check the console for error messages
2. Verify all prerequisites are installed
3. Ensure environment variables are correct
4. Check if all services are running on the correct ports

---

**Happy Coding!** 🎉
