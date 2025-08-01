#!/usr/bin/env powershell
# Docker Setup Script for Phillip Trustee Website
# Run this script on a new laptop to set up the project with Docker

Write-Host "🐳 Phillip Trustee Website - Docker Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>$null
    $composeVersion = docker-compose --version 2>$null
    
    if ($dockerVersion -and $composeVersion) {
        Write-Host "✅ Docker is installed" -ForegroundColor Green
        Write-Host "   Docker: $dockerVersion" -ForegroundColor Gray
        Write-Host "   Compose: $composeVersion" -ForegroundColor Gray
    } else {
        Write-Host "❌ Docker is not installed or not running" -ForegroundColor Red
        Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Docker is not installed or not running" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
    exit 1
}

# Check if Docker is running
Write-Host "Checking if Docker is running..." -ForegroundColor Yellow
try {
    docker info > $null 2>&1
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and try again" -ForegroundColor Red
    exit 1
}

# Check for port conflicts
Write-Host "Checking for port conflicts..." -ForegroundColor Yellow
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
$port3005 = Get-NetTCPConnection -LocalPort 3005 -ErrorAction SilentlyContinue
$port5432 = Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue

if ($port3000) {
    Write-Host "⚠️  Port 3000 is in use (Frontend)" -ForegroundColor Yellow
}
if ($port3005) {
    Write-Host "⚠️  Port 3005 is in use (Backend)" -ForegroundColor Yellow
}
if ($port5432) {
    Write-Host "⚠️  Port 5432 is in use (Database)" -ForegroundColor Yellow
}

if ($port3000 -or $port3005 -or $port5432) {
    Write-Host "Do you want to continue anyway? Docker will try to use these ports. (y/N): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Setup cancelled. Please free up the ports and try again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 Starting Docker setup..." -ForegroundColor Cyan

# Build and start services
Write-Host "Building and starting services (this may take a few minutes)..." -ForegroundColor Yellow
try {
    docker-compose up --build -d
    
    Write-Host ""
    Write-Host "✅ Docker setup completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Access your application:" -ForegroundColor Cyan
    Write-Host "   Frontend:        http://localhost:3000" -ForegroundColor White
    Write-Host "   Backend API:     http://localhost:3005/api" -ForegroundColor White
    Write-Host "   API Docs:        http://localhost:3005/api/docs" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Check service status:" -ForegroundColor Cyan
    Write-Host "   docker-compose ps" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📝 View logs:" -ForegroundColor Cyan
    Write-Host "   docker-compose logs" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🛑 Stop services:" -ForegroundColor Cyan
    Write-Host "   docker-compose down" -ForegroundColor Gray
    Write-Host ""
    
    # Show service status
    Write-Host "Current service status:" -ForegroundColor Yellow
    docker-compose ps
    
} catch {
    Write-Host ""
    Write-Host "❌ Error during Docker setup!" -ForegroundColor Red
    Write-Host "Check the logs with: docker-compose logs" -ForegroundColor Yellow
    Write-Host "Try rebuilding with: docker-compose up --build --force-recreate" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup complete! Your application should be running." -ForegroundColor Green
