# 🏛️ Phillip Trustee Website

A modern, full-stack web application built with NestJS backend and Nuxt.js frontend.

## 🚀 Quick Start

### 🐳 Docker Setup (Recommended for New Laptops)

**Easiest way - no Node.js or PostgreSQL installation needed:**

```bash
# 1. Clone the repository
git clone https://github.com/nasa-earth/Phillip-Trustee-Website.git
cd Phillip-Trustee-Website

# 2. Start with Docker (requires Docker Desktop)
docker-compose up --build -d

# 3. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3005/api
```

📖 **Detailed Docker Guide:** [DOCKER-DEPLOY.md](./DOCKER-DEPLOY.md)

### 🔧 Manual Setup (For Development)

1. **Check Compatibility First:**

   ```bash
   node check-environment.js
   ```

2. **Automated Setup:**

   ```bash
   # Windows
   .\setup.ps1

   # Linux/macOS
   ./setup.sh
   ```

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3005/api
   - API Docs: http://localhost:3005/api/docs

## 📚 Documentation

- **[🛠️ Complete Setup Guide](./SETUP-GUIDE.md)** - Detailed installation instructions
- **[📋 Deployment Checklist](./DEPLOYMENT-CHECKLIST.md)** - Quick setup verification
- **[🛡️ Version Compatibility](./VERSION-COMPATIBILITY.md)** - Avoid version conflicts
- **[🐳 Docker Setup](./docker-compose.yml)** - Container-based deployment

## 🏗️ Project Structure

```
├── backend/          # NestJS API server
│   ├── src/          # Source code
│   ├── prisma/       # Database schema
│   └── uploads/      # File storage
├── frontend/         # Nuxt.js application
│   ├── pages/        # Vue pages
│   ├── components/   # Vue components
│   └── assets/       # Static assets
└── docs/             # Documentation
```

## 🔧 Technology Stack

- **Backend:** NestJS, Prisma, PostgreSQL
- **Frontend:** Nuxt.js, Vue 3, TailwindCSS, PrimeVue
- **Database:** PostgreSQL
- **Authentication:** JWT
- **File Upload:** Multer
- **API Documentation:** Swagger

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start frontend
npm run start:dev    # Start backend

# Build
npm run build        # Build frontend
npm run build        # Build backend

# Database
npx prisma studio    # Database GUI
npx prisma db push   # Apply schema changes
node verify-events.js # Verify database

# Docker
docker-compose up    # Run everything with Docker
```

## 🛡️ Version Requirements

- **Node.js:** 18.19.0 (LTS)
- **npm:** 9.0.0+
- **PostgreSQL:** 12.0+

_See [VERSION-COMPATIBILITY.md](./VERSION-COMPATIBILITY.md) for detailed compatibility information._

## 🐳 Docker Option

For the most consistent setup across different machines:

```bash
docker-compose up --build
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Verify setup
node verify-events.js
```

## 📞 Support

Having issues? Check these resources:

1. **[Setup Guide](./SETUP-GUIDE.md)** - Step-by-step instructions
2. **[Compatibility Guide](./VERSION-COMPATIBILITY.md)** - Version conflict solutions
3. **[Checklist](./DEPLOYMENT-CHECKLIST.md)** - Verify your setup
4. **Environment Check** - Run `node check-environment.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ for Phillip Trustee**
