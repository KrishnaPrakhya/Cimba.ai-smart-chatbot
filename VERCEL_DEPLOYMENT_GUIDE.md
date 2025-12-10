# 🚀 Vercel Deployment Guide

Complete guide to deploy your Smart Customer Support Chatbot on Vercel.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your code pushed to GitHub
- Gemini API key

---

## 🎯 Deployment Strategy

We'll deploy:

1. **Backend** → Vercel (Serverless Functions)
2. **Frontend** → Vercel (Static Site)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Update Backend for Production

The backend is already configured with `vercel.json`. Make sure your `server.js` exports the app:

Add this at the end of `backend/server.js`:

```javascript
export default app;
```

### 1.2 Update Frontend API URL

Create an environment variable file for production:

**frontend/.env.production**:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

Update your frontend code to use environment variables:

**frontend/src/pages/ChatPage.jsx** (line 11):

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

**frontend/src/components/Sidebar.jsx** (line 5):

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

## 🔧 Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

---

## 🌐 Step 3: Deploy Backend to Vercel

### 3.1 Login to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New" → "Project"

### 3.2 Import Backend

1. Select your GitHub repository
2. Vercel will detect it's a monorepo
3. Click "Configure Project"

### 3.3 Configure Backend Settings

**Framework Preset**: Other

**Root Directory**: `backend`

**Build Command**: Leave empty (or `npm install`)

**Output Directory**: Leave empty

**Install Command**: `npm install`

### 3.4 Add Environment Variables

Click "Environment Variables" and add:

| Name             | Value               |
| ---------------- | ------------------- |
| `GEMINI_API_KEY` | Your Gemini API key |
| `NODE_ENV`       | production          |

### 3.5 Deploy Backend

1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://your-backend.vercel.app`)

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Create New Project

1. Click "Add New" → "Project" again
2. Select the same repository
3. Click "Configure Project"

### 4.2 Configure Frontend Settings

**Framework Preset**: Vite

**Root Directory**: `frontend`

**Build Command**: `npm run build`

**Output Directory**: `dist`

**Install Command**: `npm install`

### 4.3 Add Environment Variables

Click "Environment Variables" and add:

| Name           | Value                               |
| -------------- | ----------------------------------- |
| `VITE_API_URL` | https://your-backend.vercel.app/api |

**Important**: Replace `your-backend.vercel.app` with your actual backend URL from Step 3.5

### 4.4 Deploy Frontend

1. Click "Deploy"
2. Wait for deployment to complete
3. Your app is now live! 🎉

---

## 🔄 Step 5: Update CORS Settings

After deployment, update your backend CORS to allow your frontend domain:

**backend/server.js** (around line 10):

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app", // Add your frontend URL
    ],
    credentials: true,
  })
);
```

Commit and push this change:

```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

Vercel will automatically redeploy your backend.

---

## ✅ Step 6: Test Your Deployment

1. Visit your frontend URL (e.g., `https://your-frontend.vercel.app`)
2. Navigate to the Chat page
3. Send a test message
4. Verify the chatbot responds correctly

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Solution**: Make sure you added your frontend URL to CORS origins in `server.js`

### Issue: API Not Found

**Solution**:

1. Check `VITE_API_URL` environment variable in Vercel
2. Make sure it includes `/api` at the end
3. Verify backend is deployed and running

### Issue: Environment Variables Not Working

**Solution**:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure variables are set for "Production"
3. Redeploy the project

### Issue: Build Failed

**Solution**:

1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Try building locally first: `npm run build`

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard

- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Backend Logs

1. Go to your backend project in Vercel
2. Click "Functions" tab
3. View real-time logs

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys! 🚀
```

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `chatbot.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

---

## 💡 Pro Tips

### 1. Preview Deployments

- Every branch gets a preview URL
- Test changes before merging to main

### 2. Environment Variables per Branch

- Set different variables for production/preview
- Useful for testing with different API keys

### 3. Rollback

- Click "Deployments" in Vercel dashboard
- Click "..." on any previous deployment
- Click "Promote to Production"

### 4. Performance

- Vercel automatically optimizes your build
- Uses CDN for fast global delivery
- Automatic HTTPS

---

## 📱 Alternative: Deploy Both in One Project

If you prefer a single deployment:

### Option A: Vercel Monorepo

Create `vercel.json` in root:

```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

Then deploy the root directory.

---

## 🎉 Success Checklist

- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Test chat functionality
- [ ] All routes working (Home, Chat, About)
- [ ] FAQ sidebar working
- [ ] Export chat working

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel CLI**: https://vercel.com/docs/cli
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Custom Domains**: https://vercel.com/docs/custom-domains

---

**Congratulations! Your Smart Customer Support Chatbot is now live! 🚀✨**

Share your deployment URL and show off your amazing project!
