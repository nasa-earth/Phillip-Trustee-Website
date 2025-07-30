#!/bin/bash

# 🚀 Phillip Trustee Website - Quick Setup Script
# This script automates the initial setup process

echo "🚀 Starting Phillip Trustee Website Setup..."
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found in PATH. Make sure PostgreSQL is installed and running."
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🔧 Setting up environment file..."
if [ ! -f "backend/.env" ]; then
    echo "⚠️  .env file not found in backend directory."
    echo "📝 Creating a template .env file..."
    cat > backend/.env << EOL
# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/db-phillip-trustee-website?schema=public"

# JWT Secret for authentication
JWT_SECRET="6890b62620572b2ee90b55f7d6344d2eaacfdcd49f006f5b5b115276d373eddb"

# Server Port
PORT=3005
EOL
    echo "📄 Template .env file created in backend directory."
    echo "⚠️  Please edit backend/.env and update the DATABASE_URL with your PostgreSQL credentials."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🗄️  Setting up Prisma..."
cd backend
npx prisma generate

echo ""
echo "✅ Setup completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database 'db-phillip-trustee-website' in PostgreSQL"
echo "3. Update DATABASE_URL in backend/.env with your PostgreSQL credentials"
echo "4. Run: cd backend && npx prisma db push"
echo "5. (Optional) Seed database: node seed-events.js"
echo "6. Start backend: npm run start:dev"
echo "7. Start frontend: cd ../frontend && npm run dev"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3005/api"
echo "   API Docs: http://localhost:3005/api/docs"
echo ""
echo "Happy coding! 🎉"
