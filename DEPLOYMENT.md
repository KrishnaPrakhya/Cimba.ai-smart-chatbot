# 🚀 Deployment Guide

## Local Development (Already Done!)

You're currently running in development mode. This guide will help you deploy to production.

## 📦 Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Verify API key works
- [ ] Check error handling
- [ ] Test on different browsers
- [ ] Optimize images and assets
- [ ] Review security settings
- [ ] Update documentation

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel

1. **Prepare Frontend**

```bash
cd frontend
npm run build
```

2. **Deploy to Vercel**

```bash
npm install -g vercel
vercel login
vercel
```

3. **Configure Environment**

- Set `VITE_API_URL` to your backend URL

#### Backend on Railway

1. **Create Railway Account**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Add Environment Variables**:
   - `GEMINI_API_KEY`
   - `PORT=5000`
4. **Deploy**: Railway auto-deploys on push

### Option 2: Render (Full Stack)

#### Backend on Render

1. **Create Account**: https://render.com
2. **New Web Service**
3. **Connect Repository**
4. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add `GEMINI_API_KEY`

#### Frontend on Render

1. **New Static Site**
2. **Configure**:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables: Add `VITE_API_URL`

### Option 3: Heroku (Full Stack)

#### Backend on Heroku

```bash
cd backend
heroku create your-app-name-backend
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

#### Frontend on Heroku

```bash
cd frontend
heroku create your-app-name-frontend
heroku config:set VITE_API_URL=https://your-backend.herokuapp.com
git push heroku main
```

### Option 4: AWS (Advanced)

#### Backend on EC2

1. **Launch EC2 Instance** (Ubuntu)
2. **Install Node.js**:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone and Setup**:

```bash
git clone your-repo
cd backend
npm install
```

4. **Use PM2 for Process Management**:

```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

5. **Configure Nginx** (reverse proxy)

#### Frontend on S3 + CloudFront

1. **Build Frontend**:

```bash
cd frontend
npm run build
```

2. **Upload to S3**:

```bash
aws s3 sync dist/ s3://your-bucket-name
```

3. **Configure CloudFront** for CDN

### Option 5: Docker (Containerized)

#### Create Dockerfiles

**backend/Dockerfile**:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**frontend/Dockerfile**:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

**docker-compose.yml**:

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:5000
```

**Deploy**:

```bash
docker-compose up -d
```

## 🔧 Production Configuration

### Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend Environment Variables

Update `backend/.env`:

```env
GEMINI_API_KEY=your_production_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

### Update CORS in Backend

```javascript
// backend/server.js
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
```

## 🔐 Security Hardening

### 1. Environment Variables

- Never commit `.env` files
- Use platform-specific secret management
- Rotate API keys regularly

### 2. CORS Configuration

```javascript
const allowedOrigins = [
  "https://your-domain.com",
  "https://www.your-domain.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
```

### 3. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

### 4. Helmet for Security Headers

```bash
npm install helmet
```

```javascript
const helmet = require("helmet");
app.use(helmet());
```

### 5. Input Validation

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require("express-validator");

app.post(
  "/api/chat",
  body("message").trim().isLength({ min: 1, max: 500 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... rest of code
  }
);
```

## 📊 Monitoring & Logging

### 1. Winston for Logging

```bash
npm install winston
```

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
```

### 2. Health Check Endpoint

Already implemented at `/api/health`

### 3. Error Tracking

- Use Sentry for error tracking
- Set up alerts for critical errors
- Monitor API response times

## 🚀 Performance Optimization

### Frontend

1. **Code Splitting**:

```javascript
const Sidebar = lazy(() => import("./components/Sidebar"));
```

2. **Image Optimization**:

- Use WebP format
- Lazy load images
- Compress assets

3. **Caching**:

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion"],
        },
      },
    },
  },
};
```

### Backend

1. **Database Indexing**:

```sql
CREATE INDEX idx_question ON faqs(question);
CREATE INDEX idx_category ON faqs(category);
```

2. **Response Caching**:

```bash
npm install node-cache
```

```javascript
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });

// Cache FAQ responses
app.post("/api/chat", async (req, res) => {
  const cacheKey = req.body.message.toLowerCase();
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  // ... generate response
  cache.set(cacheKey, response);
  res.json(response);
});
```

3. **Connection Pooling**:
   For production, consider PostgreSQL with connection pooling

## 📈 Scaling Strategies

### Horizontal Scaling

- Deploy multiple backend instances
- Use load balancer (Nginx, AWS ALB)
- Implement session management

### Database Scaling

- Move to PostgreSQL/MongoDB
- Implement read replicas
- Use connection pooling
- Add caching layer (Redis)

### CDN for Frontend

- Use CloudFront, Cloudflare, or Vercel Edge
- Cache static assets
- Reduce latency globally

## 🔄 CI/CD Pipeline

### GitHub Actions

**.github/workflows/deploy.yml**:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Railway deployment commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to Vercel/Netlify
```

## 🧪 Testing Before Deployment

### Backend Tests

```bash
npm install --save-dev jest supertest
```

```javascript
// backend/server.test.js
const request = require("supertest");
const app = require("./server");

describe("API Endpoints", () => {
  test("Health check", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
  });

  test("Chat endpoint", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: "What are your hours?" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("response");
  });
});
```

### Frontend Tests

```bash
npm install --save-dev @testing-library/react vitest
```

## 📱 Domain & SSL

### Custom Domain

1. Purchase domain (Namecheap, GoDaddy)
2. Configure DNS:
   - A record → Backend IP
   - CNAME → Frontend URL
3. Wait for propagation (24-48 hours)

### SSL Certificate

- **Let's Encrypt**: Free SSL
- **Cloudflare**: Free SSL + CDN
- **Platform SSL**: Most platforms provide free SSL

## 🎯 Post-Deployment

### 1. Verify Deployment

- [ ] Test all features
- [ ] Check API connectivity
- [ ] Verify SSL certificate
- [ ] Test on mobile devices
- [ ] Check loading times

### 2. Monitor

- Set up uptime monitoring (UptimeRobot)
- Configure error alerts
- Monitor API usage
- Track performance metrics

### 3. Backup

- Regular database backups
- Code repository backups
- Environment variable backups

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**:

- Check CORS origin configuration
- Verify frontend URL in backend

**API Key Issues**:

- Verify environment variable is set
- Check API key validity
- Ensure no extra spaces

**Database Connection**:

- Check file permissions
- Verify database path
- Ensure SQLite is installed

**Build Failures**:

- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are listed

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Heroku Docs**: https://devcenter.heroku.com

## 🎉 You're Ready to Deploy!

Choose your deployment platform and follow the steps above. Good luck! 🚀
