# ⚡ Quick Deploy to Vercel

## 🚀 Fast Track Deployment (5 minutes)

### Step 1: Push to GitHub (1 min)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend (2 min)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Select your repo
4. **Root Directory**: `backend`
5. Add Environment Variable:
   - `GEMINI_API_KEY` = your_api_key
6. Click "Deploy"
7. **Copy the backend URL** (e.g., `https://abc123.vercel.app`)

### Step 3: Deploy Frontend (2 min)

1. Click "Add New" → "Project" again
2. Select same repo
3. **Root Directory**: `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
5. Click "Deploy"

### Step 4: Update CORS

In `backend/server.js`, update CORS:

```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.vercel.app"],
  })
);
```

Push the change:

```bash
git add backend/server.js
git commit -m "Update CORS"
git push
```

### ✅ Done!

Visit your frontend URL and test the chatbot!

---

## 🎯 Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed with GEMINI_API_KEY
- [ ] Frontend deployed with VITE_API_URL
- [ ] CORS updated
- [ ] Tested chat functionality

---

## 🐛 Quick Fixes

**CORS Error?**
→ Add your frontend URL to CORS in `backend/server.js`

**API Not Working?**
→ Check `VITE_API_URL` includes `/api` at the end

**Build Failed?**
→ Check Vercel logs, ensure all dependencies in `package.json`

---

**Need detailed guide?** See `VERCEL_DEPLOYMENT_GUIDE.md`
