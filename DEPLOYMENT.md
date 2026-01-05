# Expense Tracker - Production Deployment Guide

This guide will walk you through deploying the Expense Tracker application to production using **Vercel** (frontend), **Render** (backend), and **Neon** (PostgreSQL database).

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌────────────────┐
│   Vercel    │────▶│    Render    │────▶│ Neon Postgres  │
│  (Frontend) │     │  (Backend)   │     │   (Database)   │
└─────────────┘     └──────────────┘     └────────────────┘
```

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Render account (sign up at [render.com](https://render.com))
- Neon account (sign up at [neon.tech](https://neon.tech))

---

## 1️⃣ Setup Neon PostgreSQL Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click **"New Project"**
3. Name it `expense-tracker-db`
4. Select region (choose closest to your users)
5. Click **"Create Project"**
6. **Copy the connection string** - it looks like:
   ```
   postgresql://username:password@host.neon.tech/database?sslmode=require
   ```
7. Save this for later - you'll need it for Render

---

## 2️⃣ Push Code to GitHub

1. Initialize Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Expense Tracker with 6 themes"
   ```

2. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it `expense-tracker`
   - **Do not** initialize with README
   - Click **"Create repository"**

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
   git branch -M main
   git push -u origin main
   ```

---

## 3️⃣ Deploy Backend to Render

### Option A: Using Render Blueprint (Recommended)

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file
5. Click **"Apply Blueprint"**
6. Set environment variables:
   - `DATABASE_URL`: Paste the Neon connection string from Step 1
   - `JWT_SECRET`: Will be auto-generated
7. Click **"Create Services"**

### Option B: Manual Setup

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `expense-tracker-api`
   - **Region**: Oregon (Free)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (monorepo)
   - **Build Command**:
     ```
     cd apps/api && npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```
     cd apps/api && npx prisma migrate deploy && npm start
     ```
5. Set **Environment Variables**:
   - `DATABASE_URL`: Paste Neon connection string
   - `JWT_SECRET`: Generate a random string (e.g., use: `openssl rand -base64 32`)
   - `NODE_ENV`: `production`
6. Select **Free** plan
7. Click **"Create Web Service"**

### Wait for Deployment

- Render will build and deploy your backend
- This takes 2-5 minutes
- Once deployed, **copy the backend URL** (e.g., `https://expense-tracker-api.onrender.com`)

---

## 4️⃣ Deploy Frontend to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will detect it's a Vite project
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL from Step 3 (e.g., `https://expense-tracker-api.onrender.com`)
6. Click **"Deploy"**

### Wait for Deployment

- Vercel will build and deploy the frontend
- This takes 1-2 minutes
- Once done, you'll get a URL like: `https://expense-tracker-xyz.vercel.app`

---

## 5️⃣ Verify Deployment

1. Open your Vercel URL
2. Try to:
   - **Register** a new account
   - **Login** with your credentials
   - **Add expenses**
   - **Switch themes** (Light, Dark, Midnight, Forest, Sunset, Ocean)
   - **Change language** (ES/EN)

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Render shows "Deploy failed"
- Check the logs in Render dashboard
- Common issues:
  - Invalid `DATABASE_URL` format
  - Missing environment variables
  - Build command errors

**Problem**: API returns 500 errors
- Check Render logs
- Verify database migrations ran: Look for `npx prisma migrate deploy` in logs
- Ensure `DATABASE_URL` has `?sslmode=require` at the end

### Frontend Issues

**Problem**: Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS settings (should be automatic in production)
- Open browser console for error messages

**Problem**: Theme not persisting
- Check browser localStorage permissions
- Try incognito mode to test

---

## 🔄 Updating Your Deployment

### For Backend Changes

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push
   ```
2. Render auto-deploys on every push to `main`

### For Frontend Changes

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   ```
2. Vercel auto-deploys on every push to `main`

### For Database Schema Changes

1. Create a migration locally:
   ```bash
   cd apps/api
   npx prisma migrate dev --name your_migration_name
   ```
2. Commit the migration files:
   ```bash
   git add prisma/migrations/
   git commit -m "Add database migration"
   git push
   ```
3. Render will automatically run migrations on deployment

---

## 🎉 You're Done!

Your app is now live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-api.onrender.com`
- **Database**: Hosted on Neon

### Next Steps

- Add a custom domain in Vercel (optional)
- Set up monitoring and error tracking
- Enable GitHub Actions for automated testing

---

## 📝 Important Notes

### Free Tier Limitations

- **Render**: Spins down after 15 minutes of inactivity (first request may be slow)
- **Neon**: 0.5GB storage limit, 3GB data transfer/month
- **Vercel**: 100GB bandwidth/month

### Cost Management

All services used are **completely free** for this application size. You can scale up later if needed.

---

## 🆘 Support

If you encounter issues:
1. Check the platform-specific logs (Render, Vercel, Neon dashboards)
2. Review environment variables
3. Ensure all services are running
4. Check GitHub Actions (if configured) for CI/CD errors
