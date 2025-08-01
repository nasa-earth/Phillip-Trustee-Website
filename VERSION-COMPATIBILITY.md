# 🛡️ Version Compatibility Guide

This document ensures the project runs consistently across different laptops without version conflicts or compatibility issues.

## 📌 Required Versions

### Node.js & npm

- **Node.js**: `18.19.0` (LTS recommended)
- **npm**: `9.0.0` or higher
- **Alternative**: Use Node Version Manager (nvm)

### Database

- **PostgreSQL**: `12.0` or higher (recommended: `14.x` or `15.x`)

### Operating System Compatibility

- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 20.04+
- ✅ Any Linux distribution with Node.js 18+ support

## 🔧 Version Management Setup

### Using Node Version Manager (Recommended)

#### Windows (nvm-windows)

```powershell
# Install nvm-windows from: https://github.com/coreybutler/nvm-windows
# Then use the .nvmrc file:
nvm install 18.19.0
nvm use 18.19.0
```

#### macOS/Linux (nvm)

```bash
# Install nvm from: https://github.com/nvm-sh/nvm
# Then use the .nvmrc file:
nvm install
nvm use
```

### Manual Node.js Installation

If you prefer manual installation:

1. Download Node.js 18.19.0 from: https://nodejs.org/dist/v18.19.0/
2. Install the specific version
3. Verify: `node --version` should show `v18.19.0`

## 🚨 Common Version Issues & Solutions

### Issue 1: Node.js Version Mismatch

**Symptoms:**

- `ERR_REQUIRE_ESM` errors
- Package installation failures
- Build errors with "unsupported Node version"

**Solution:**

```bash
# Check current version
node --version

# If wrong version, use nvm:
nvm install 18.19.0
nvm use 18.19.0

# Or reinstall Node.js 18.19.0 manually
```

### Issue 2: npm Version Issues

**Symptoms:**

- Package lock file conflicts
- Dependency resolution errors

**Solution:**

```bash
# Update npm to compatible version
npm install -g npm@9

# Clear npm cache
npm cache clean --force

# Remove and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: PostgreSQL Version Compatibility

**Symptoms:**

- Database connection errors
- Prisma schema issues

**Solution:**

```bash
# Check PostgreSQL version
postgres --version

# For version < 12, consider upgrading
# Or update DATABASE_URL with compatible settings
```

### Issue 4: Operating System Differences

**Symptoms:**

- Path resolution errors
- Permission issues
- Script execution problems

**Solutions:**

**Windows PowerShell:**

```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Use forward slashes or proper path resolution
```

**Windows Command Prompt:**

```cmd
# Use the PowerShell script instead
powershell -ExecutionPolicy Bypass -File setup.ps1
```

**Linux/macOS:**

```bash
# Make scripts executable
chmod +x setup.sh
./setup.sh
```

## 🔒 Lock File Management

### Package Lock Files

- **Backend**: `package-lock.json` (npm)
- **Frontend**: `package-lock.json` (npm)

**Important:** Always commit lock files to ensure consistent installs across machines.

### Prisma Lock

- **File**: `prisma/schema.prisma`
- **Generated**: `generated/prisma/` (auto-generated, don't commit)

## 📋 Pre-Installation Checklist

Run this checklist before setting up on a new laptop:

```bash
# 1. Check Node.js version
node --version
# Expected: v18.19.0

# 2. Check npm version
npm --version
# Expected: 9.x.x or higher

# 3. Check PostgreSQL
postgres --version
# Expected: 12.x or higher

# 4. Check Git
git --version
# Expected: Any recent version

# 5. Check available ports
netstat -an | findstr :3000  # Should be empty
netstat -an | findstr :3005  # Should be empty
```

## 🛠️ Environment Setup Commands

### Quick Version Check Script

Create and run this script to verify your environment:

```bash
#!/bin/bash
echo "🔍 Environment Compatibility Check"
echo "=================================="

# Check Node.js
NODE_VERSION=$(node --version 2>/dev/null || echo "Not installed")
echo "Node.js: $NODE_VERSION"
if [[ "$NODE_VERSION" =~ ^v18\.19\. ]]; then
    echo "✅ Node.js version is compatible"
else
    echo "❌ Node.js version mismatch. Expected: v18.19.x"
fi

# Check npm
NPM_VERSION=$(npm --version 2>/dev/null || echo "Not installed")
echo "npm: $NPM_VERSION"

# Check PostgreSQL
PG_VERSION=$(postgres --version 2>/dev/null || echo "Not installed")
echo "PostgreSQL: $PG_VERSION"

echo ""
echo "📋 Next Steps:"
echo "1. Fix any version mismatches above"
echo "2. Run setup script: ./setup.sh or setup.ps1"
echo "3. Follow SETUP-GUIDE.md"
```

### Force Specific Versions (If Issues Persist)

If you encounter persistent version issues, use these commands:

```bash
# Clear everything and start fresh
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

# Install with exact versions
npm ci  # Uses exact versions from package-lock.json

# For Prisma issues
cd backend
npx prisma generate --schema=prisma/schema.prisma
npx prisma db push
```

## 🔄 Migration Guide (Existing Project)

If updating an existing installation:

1. **Backup current project**
2. **Check current versions**: `node --version`, `npm --version`
3. **Update Node.js** to 18.19.0 if needed
4. **Clear dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   rm -rf frontend/node_modules frontend/package-lock.json
   ```
5. **Reinstall with new versions**:
   ```bash
   npm install  # In both backend and frontend
   ```
6. **Update database** (if needed):
   ```bash
   cd backend
   npx prisma db push
   ```

## 📞 Troubleshooting Support

### Quick Fixes for Common Errors

**Error: "Cannot find module"**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Prisma Client not generated"**

```bash
cd backend
npx prisma generate
```

**Error: "Port already in use"**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

**Error: "Permission denied"**

```bash
# Linux/macOS
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ./

# Windows (Run as Administrator)
```

### Contact Information

If issues persist after following this guide:

1. Check the error logs in terminal
2. Verify all prerequisites are met
3. Try the "force clean install" commands above
4. Create an issue with error details and system info

---

**🎯 Goal**: Zero compatibility issues across different development environments!
