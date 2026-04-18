# Deployment Guide for Cornerstone MathSphere

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables:
     ```
     REACT_APP_API_URL=https://your-backend.herokuapp.com/api
     ```
   - Click "Deploy"

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy on Netlify:**
   - Drag and drop the `build` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repo for automatic deployments
   - Set environment variables in Site settings

### Option 3: GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/cornerstone-mathsphere",

npm run build
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Then run:
```bash
npm run deploy
```

---

## Backend Deployment Options

### Option 1: Heroku

1. **Install Heroku CLI** and login

2. **Create Heroku app:**
   ```bash
   heroku create cornerstone-mathsphere-api
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASSWORD=your_app_password
   ```

4. **Create Procfile in root:**
   ```
   web: cd server && node server.js
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 2: Railway

1. **Go to [railway.app](https://railway.app)**
2. **Create new project**
3. **Connect GitHub repository**
4. **Add MongoDB plugin:**
   - Click "Add Plugin"
   - select "MongoDB"
5. **Deploy automatically**

### Option 3: Render

1. **Go to [render.com](https://render.com)**
2. **New Web Service**
3. **Connect GitHub**
4. **Select repository**
5. **Configure:**
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
6. **Add environment variables**
7. **Create**

### Option 4: AWS Lambda + API Gateway

1. **Install Serverless Framework:**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless configuration**
3. **Deploy:**
   ```bash
   serverless deploy
   ```

---

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create account at [mongodb.com](https://mongodb.com)**
2. **Create a cluster (free tier available)**
3. **Create database user**
4. **Get connection string:**
   ```
   mongodb+srv://user:password@cluster.mongodb.net/dbname
   ```
5. **Set in backend .env as MONGO_URI**

### Alternative: Self-hosted MongoDB

1. **Install MongoDB on server**
2. **Configure for remote access**
3. **Use connection string:**
   ```
   mongodb://user:password@ip:27017/dbname
   ```

---

## Environment Variables for Production

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ANALYTICS_ID=your_analytics_id
```

### Backend (.env on Heroku/Railway/Render)
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cornerstone
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@cornerstonemathsphere.in
ADMIN_EMAIL=admin@cornerstonemathsphere.in
```

---

## Production Checklist

- [ ] Set NODE_ENV=production on backend
- [ ] Use strong database passwords
- [ ] Enable HTTPS everywhere
- [ ] Set up proper CORS headers
- [ ] Configure email rate limiting
- [ ] Set up daily database backups
- [ ] Enable monitoring and alerts
- [ ] Use secrets manager for sensitive data
- [ ] Implement request logging
- [ ] Test email notifications
- [ ] Test SMS notifications (if added)
- [ ] Performance testing
- [ ] Security audit

---

## Domain Setup

### Using Custom Domain

#### Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS setup instructions

#### Backend (Heroku)
```bash
heroku domains:add api.yourdomain.com
```

#### DNS Configuration
Add CNAME record:
```
api.yourdomain.com -> your-heroku-app.herokuapp.com
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install && cd server && npm install
      
      - name: Run tests
        run: npm test
      
      - name: Deploy Frontend
        run: npm run build
      
      - name: Deploy Backend
        run: cd server && npm start
```

---

## Monitoring & Logging

### Recommended Tools
- **Logging:** Winston, Morgan
- **Monitoring:** Sentry, LogRocket
- **Analytics:** Google Analytics, Mixpanel
- **Uptime Monitoring:** Uptime Robot
- **Performance:** New Relic, Datadog

---

## Troubleshooting

### CORS Errors
- Check CORS configuration in server.js
- Ensure frontend URL is whitelisted

### Email Not Sending
- Verify Gmail App Password
- Check SMTP credentials
- Enable "Less secure apps" if needed

### Database Connection Issues
- Verify MongoDB URI
- Check network whitelist in MongoDB Atlas
- Ensure username/password are correct

### 404 Errors After Deployment
- Configure routing for SPA (client-side routing)
- Add `_redirects` file for Netlify:
  ```
  /* /index.html 200
  ```

---

For detailed help, contact: info@cornerstonemathsphere.in
