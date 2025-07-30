# 📋 Deployment Checklist

Use this checklist when setting up the project on a new laptop:

## ✅ Prerequisites

- [ ] Node.js (v18+) installed
- [ ] PostgreSQL installed and running
- [ ] Git installed

## ✅ Repository Setup

- [ ] Repository cloned from GitHub
- [ ] Navigate to project directory

## ✅ Backend Setup

- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file with correct DATABASE_URL
- [ ] Database `db-phillip-trustee-website` created in PostgreSQL
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] (Optional) Run seeding scripts

## ✅ Frontend Setup

- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`

## ✅ Testing

- [ ] Backend starts successfully: `npm run start:dev`
- [ ] Frontend starts successfully: `npm run dev`
- [ ] Can access frontend at http://localhost:3000
- [ ] Can access backend at http://localhost:3005/api
- [ ] API documentation loads at http://localhost:3005/api/docs
- [ ] Database verification script runs: `node verify-events.js`

## ✅ Environment Variables

- [ ] `DATABASE_URL` points to correct PostgreSQL instance
- [ ] `JWT_SECRET` is set
- [ ] `PORT` is set to 3005

## 🆘 Troubleshooting Commands

```bash
# Reset node_modules
rm -rf node_modules
npm install

# Reset Prisma
npx prisma generate
npx prisma db push

# Check services
node verify-events.js

# Check ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :3005
```

---

**📞 Need Help?** Check the [SETUP-GUIDE.md](./SETUP-GUIDE.md) for detailed instructions.
