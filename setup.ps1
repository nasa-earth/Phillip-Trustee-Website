# 🚀 Phillip Trustee Website - Quick Setup Script (PowerShell)
# This script automates the initial setup process for Windows

Write-Host "🚀 Starting Phillip Trustee Website Setup..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is accessible
try {
    psql --version | Out-Null
    Write-Host "✅ PostgreSQL found" -ForegroundColor Green
} catch {
    Write-Host "⚠️  PostgreSQL not found in PATH. Make sure PostgreSQL is installed and running." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Cyan
Set-Location backend

npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
Set-Location ../frontend

npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "🔧 Setting up environment file..." -ForegroundColor Cyan

if (-not (Test-Path "backend/.env")) {
    Write-Host "⚠️  .env file not found in backend directory." -ForegroundColor Yellow
    Write-Host "📝 Creating a template .env file..." -ForegroundColor Cyan
    
    $envContent = @"
# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/db-phillip-trustee-website?schema=public"

# JWT Secret for authentication
JWT_SECRET="6890b62620572b2ee90b55f7d6344d2eaacfdcd49f006f5b5b115276d373eddb"

# Server Port
PORT=3005
"@
    
    $envContent | Out-File -FilePath "backend/.env" -Encoding UTF8
    Write-Host "📄 Template .env file created in backend directory." -ForegroundColor Green
    Write-Host "⚠️  Please edit backend/.env and update the DATABASE_URL with your PostgreSQL credentials." -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🗄️  Setting up Prisma..." -ForegroundColor Cyan
Set-Location backend
npx prisma generate

Write-Host ""
Write-Host "✅ Setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure PostgreSQL is running" -ForegroundColor White
Write-Host "2. Create database 'db-phillip-trustee-website' in PostgreSQL" -ForegroundColor White
Write-Host "3. Update DATABASE_URL in backend/.env with your PostgreSQL credentials" -ForegroundColor White
Write-Host "4. Run: cd backend; npx prisma db push" -ForegroundColor White
Write-Host "5. (Optional) Seed database: node seed-events.js" -ForegroundColor White
Write-Host "6. Start backend: npm run start:dev" -ForegroundColor White
Write-Host "7. Start frontend: cd ../frontend; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3005/api" -ForegroundColor White
Write-Host "   API Docs: http://localhost:3005/api/docs" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green
