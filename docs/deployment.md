# Deployment Guide

## Backend Deployment (Render)

### Prerequisites
- MongoDB Atlas account with a connection string
- Render account (https://render.com)

### Steps

1. **Push code to GitHub** (Render deploys from Git)
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Name**: student-wallet-wise-api
     - **Region**: Oregon (US West) or closest to you
     - **Branch**: main
     - **Root Directory**: `server`
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Set Environment Variables**
   In Render dashboard, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `PORT`: 3000
   - `NODE_ENV`: production

4. **Deploy**
   - Render will auto-deploy
   - Copy your service URL (e.g., `https://student-wallet-wise-api.onrender.com`)

**Note**: Free tier spins down after 15 minutes of inactivity. First request after idle will be slow.

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- Backend API URL from Render

### Steps

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel auto-detects Vite
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./` (leave as root)
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `dist` (auto-detected)

3. **Set Environment Variable**
   In Vercel project settings → Environment Variables:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your Render backend URL (e.g., `https://student-wallet-wise-api.onrender.com`)
   - **Environments**: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy
   - You'll get a URL like `https://student-wallet-wise.vercel.app`

### Alternative: Deploy via CLI
```bash
# From project root
vercel
# Follow prompts, set VITE_API_BASE_URL when asked
vercel --prod  # deploy to production
```

---

## Post-Deployment

### Update CORS (Backend)
Edit `server/src/app.ts`:
```ts
app.use(cors({ 
  origin: ['https://student-wallet-wise.vercel.app', 'http://localhost:5173'],
  credentials: true 
}));
```
Commit and push to trigger Render redeploy.

### Test Integration
1. Visit your Vercel URL
2. Register a new account
3. Add expenses and set budget
4. Verify data persists (check MongoDB Atlas)

### Custom Domains (Optional)
- **Render**: Project Settings → Custom Domain
- **Vercel**: Project Settings → Domains

---

## Troubleshooting

**Backend not responding**
- Check Render logs in dashboard
- Verify MONGODB_URI is correct
- Ensure PORT is set to 3000

**Frontend can't reach backend**
- Verify VITE_API_BASE_URL in Vercel env vars
- Check CORS settings in backend
- Open browser console for errors

**Database connection failed**
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify connection string format

**Build failures**
- Check Node version (ensure >=18)
- Clear build cache and retry
- Review build logs for specific errors

---

## Monitoring

### Render
- View logs: Dashboard → Service → Logs
- Monitor health: Dashboard → Service → Metrics

### Vercel
- View deployments: Dashboard → Project → Deployments
- Analytics: Dashboard → Project → Analytics

### MongoDB Atlas
- Monitor connections: Clusters → Metrics
- View queries: Clusters → Performance Advisor
