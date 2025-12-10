# ✅ Vercel Deployment Checklist

## 📋 Pre-Deployment

- [ ] Code is working locally
- [ ] Backend runs on `http://localhost:5000`
- [ ] Frontend runs on `http://localhost:5173`
- [ ] Chat functionality tested
- [ ] All routes working (Home, Chat, About)
- [ ] Have Gemini API key ready
- [ ] Code pushed to GitHub

---

## 🔧 Backend Deployment

### Vercel Configuration

- [ ] Login to Vercel (https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Select your GitHub repository
- [ ] Set **Root Directory** to `backend`
- [ ] Framework: **Other**
- [ ] Build Command: Leave empty
- [ ] Output Directory: Leave empty

### Environment Variables

- [ ] Add `GEMINI_API_KEY` = `your_actual_api_key`
- [ ] Add `NODE_ENV` = `production`

### Deploy

- [ ] Click "Deploy"
- [ ] Wait for deployment (1-2 minutes)
- [ ] Copy backend URL (e.g., `https://abc123.vercel.app`)
- [ ] Test backend: Visit `https://your-backend.vercel.app/api/health`
- [ ] Should see: `{"status":"ok","message":"Server is running"}`

---

## 🎨 Frontend Deployment

### Vercel Configuration

- [ ] Click "Add New" → "Project" again
- [ ] Select same GitHub repository
- [ ] Set **Root Directory** to `frontend`
- [ ] Framework: **Vite**
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variables

- [ ] Add `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
- [ ] **Important**: Replace with YOUR actual backend URL
- [ ] **Important**: Include `/api` at the end

### Deploy

- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy frontend URL (e.g., `https://xyz789.vercel.app`)

---

## 🔄 Post-Deployment Updates

### Update CORS in Backend

1. Open `backend/server.js`
2. Find the CORS configuration (around line 10)
3. Update to:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-url.vercel.app", // Add YOUR frontend URL
    ],
    credentials: true,
  })
);
```

4. Commit and push:

```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

5. Vercel will auto-redeploy backend

---

## 🧪 Testing

### Backend Tests

- [ ] Visit `https://your-backend.vercel.app/api/health`
- [ ] Should return: `{"status":"ok",...}`
- [ ] Visit `https://your-backend.vercel.app/api/faqs`
- [ ] Should return array of 10 FAQs

### Frontend Tests

- [ ] Visit your frontend URL
- [ ] Home page loads correctly
- [ ] Click "Get Started" → Goes to Chat
- [ ] Header navigation works
- [ ] Click "Chat" in header → Chat page loads

### Chat Functionality Tests

- [ ] Type a message and send
- [ ] Bot responds (no CORS error)
- [ ] Try: "What are your business hours?"
- [ ] Should see FAQ count indicator
- [ ] Click book icon → Sidebar opens
- [ ] Click FAQ → Auto-fills question
- [ ] Export chat → Downloads file
- [ ] Clear chat → Resets conversation

---

## 🎯 Success Indicators

### ✅ Backend is Working

- Health endpoint returns OK
- FAQs endpoint returns data
- No errors in Vercel logs

### ✅ Frontend is Working

- All pages load
- Navigation works
- No console errors
- Styles load correctly

### ✅ Integration is Working

- Chat sends messages
- Bot responds
- No CORS errors
- FAQ retrieval works

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error in Browser Console

**Symptoms**:

```
Access to fetch at 'https://backend.vercel.app/api/chat'
from origin 'https://frontend.vercel.app' has been blocked by CORS
```

**Solution**:

1. Add your frontend URL to CORS in `backend/server.js`
2. Push changes to GitHub
3. Wait for auto-redeploy

---

### Issue: API Not Found (404)

**Symptoms**: Chat doesn't respond, 404 error in console

**Solution**:

1. Check `VITE_API_URL` in Vercel frontend settings
2. Make sure it ends with `/api`
3. Example: `https://backend.vercel.app/api` ✅
4. Not: `https://backend.vercel.app` ❌

---

### Issue: Environment Variables Not Working

**Symptoms**: API key errors, undefined variables

**Solution**:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Make sure variables are set for "Production"
5. Redeploy: Deployments → Latest → "Redeploy"

---

### Issue: Build Failed

**Symptoms**: Deployment fails with build errors

**Solution**:

1. Check build logs in Vercel
2. Test build locally: `npm run build`
3. Make sure all dependencies in `package.json`
4. Check for syntax errors

---

### Issue: Database Not Working

**Symptoms**: No FAQs, database errors

**Solution**:

1. SQLite works on Vercel but resets on each deploy
2. For production, consider:
   - Vercel Postgres
   - MongoDB Atlas
   - Supabase
3. Current setup: FAQs recreate on each cold start (OK for demo)

---

## 📊 Monitoring

### Vercel Dashboard

- [ ] Check deployment status
- [ ] View function logs
- [ ] Monitor performance
- [ ] Check analytics

### Backend Logs

1. Go to backend project in Vercel
2. Click "Functions" tab
3. View real-time logs
4. Check for errors

### Frontend Logs

1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests

---

## 🎉 Deployment Complete!

### Share Your Project

**Frontend URL**: `https://your-frontend.vercel.app`

**Backend URL**: `https://your-backend.vercel.app`

### Next Steps

- [ ] Share with friends/colleagues
- [ ] Add to portfolio
- [ ] Submit assignment
- [ ] Get feedback
- [ ] Add custom domain (optional)

---

## 🔄 Continuous Deployment

Every time you push to GitHub:

```bash
git add .
git commit -m "New feature"
git push
```

Vercel automatically:

1. Detects the push
2. Builds your project
3. Deploys to production
4. Updates your live site

**No manual deployment needed!** 🚀

---

## 💡 Pro Tips

1. **Preview Deployments**: Every branch gets a preview URL
2. **Instant Rollback**: Revert to any previous deployment
3. **Environment per Branch**: Different settings for dev/prod
4. **Custom Domains**: Add your own domain for free
5. **Analytics**: Built-in performance monitoring

---

## 📞 Support

**Stuck?** Check these resources:

- 📖 Full Guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- ⚡ Quick Guide: `QUICK_DEPLOY.md`
- 🌐 Vercel Docs: https://vercel.com/docs
- 💬 Vercel Support: https://vercel.com/support

---

**Congratulations on deploying your Smart Customer Support Chatbot! 🎊**

You now have a live, production-ready AI chatbot accessible from anywhere in the world!
