# Development Setup Guide

## Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Git**: For version control
- **MongoDB**: Local or Atlas account
- **GitHub Account**: For hosting code
- **Gmail Account**: For email notifications

## Installation Steps

### 1. Clone/Setup Project

```bash
cd c:\Users\hp\OneDrive\Desktop\tution
```

### 2. Run Setup Script (Windows)

Double-click `setup.bat` or run:
```bash
setup.bat
```

Or manually:

#### Frontend Setup
```bash
npm install
cp .env.example .env
```

Update `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ANALYTICS_ID=dev
```

#### Backend Setup
```bash
cd server
npm install
cp .env.example .env
```

Update `server/.env`:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cornerstone-mathsphere
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
```

## Running the Application

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Frontend:**
```bash
npm start
```
- Runs on `http://localhost:3000`
- Auto-reloads on file changes
- Opens browser automatically

**Terminal 2 - Backend:**
```bash
cd server
npm start
# Or with auto-reload:
npm run dev
```
- Runs on `http://localhost:5000`
- API available at `http://localhost:5000/api`

### Option 2: Running with Concurrently

Install globally:
```bash
npm install -g concurrently
```

From project root:
```bash
concurrently "npm start" "cd server && npm start"
```

## Project Structure Explanation

```
tution/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.js              # Main component (all pages + styles)
│   ├── AdminDashboard.js   # Admin panel for enquiry management
│   ├── api.js              # API service layer
│   ├── utils.js            # Utility functions & helpers
│   └── index.js            # React DOM root
├── server/
│   ├── server.js           # Express.js backend
│   ├── package.json        # Server dependencies
│   └── .env               # Server configuration (gitignored)
├── .env                    # Frontend config (gitignored)
├── .env.example            # Template for .env
├── .gitignore              # Git ignore rules
├── package.json            # Frontend dependencies
├── README.md               # Documentation
├── DEPLOYMENT.md           # Deployment guide
└── setup.bat/sh            # Setup scripts
```

## Common Development Tasks

### Code Generation

Add new page component:
```javascript
function NewPage() {
  return (
    <div className="section">
      <h1>New Page</h1>
    </div>
  );
}
```

Then add to App.js:
1. Import the component
2. Add route in conditional rendering
3. Add to PAGE_LABELS
4. Add navigation link

### Adding Database Schema

In `server/server.js`:
```javascript
const newSchema = new mongoose.Schema({
  field: String,
  createdAt: { type: Date, default: Date.now }
});

const NewModel = mongoose.model('NewModel', newSchema);
```

### Creating API Endpoint

```javascript
app.post('/api/new-endpoint', async (req, res) => {
  try {
    const { data } = req.body;
    // Process data
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Testing

### Frontend Testing

Install testing library:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Create test file: `src/App.test.js`

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  expect(screen.getByText(/Cornerstone MathSphere/i)).toBeInTheDocument();
});
```

Run tests:
```bash
npm test
```

### Backend Testing

Install testing library:
```bash
cd server
npm install --save-dev jest supertest
```

Run tests:
```bash
npm test
```

## Database Management

### MongoDB Local Setup

1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Install and start the service
3. Use connection string: `mongodb://localhost:27017/cornerstone-mathsphere`

### Using MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env`:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cornerstone
   ```

### Useful MongoDB Commands

```bash
# Open MongoDB shell (if installed locally)
mongosh

# Connect to database
use cornerstone-mathsphere

# View collections
show collections

# View enquiries
db.enquiries.find()

# Clear enquiries
db.enquiries.deleteMany({})

# View all databases
show dbs
```

## Debugging

### Frontend Debugging

1. **React DevTools**: Install browser extension
2. **Console**: Open browser dev tools (F12)
3. **Logs**: Check browser console for errors
4. **Network Tab**: Check API calls

### Backend Debugging

1. **Logs**: Check terminal output
2. **Debug Mode**: Add `console.log()` statements
3. **Network**: Use Postman to test endpoints
4. **Database**: Check MongoDB directly

### Using Postman

1. Download Postman: https://www.postman.com/download
2. Create requests:
   ```
   POST http://localhost:5000/api/submit-enquiry
   Body (JSON):
   {
     "name": "Test Student",
     "phone": "9876543210",
     "email": "test@example.com"
   }
   ```

## Git Workflow

### Initial Setup

```bash
git init
git config user.name "Your Name"
git config user.email "your-email@gmail.com"
```

### Regular Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Add feature: xyz"

# Push to origin
git push origin main

# Pull latest
git pull origin main
```

### Branching

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## Performance Tips

1. **Frontend:**
   - Use React DevTools Profiler
   - Lazy load heavy components
   - Optimize images
   - Use CSS classes instead of inline styles for complex styling

2. **Backend:**
   - Add database indexes
   - Implement caching (Redis)
   - Use pagination for large datasets
   - Optimize MongoDB queries

## Security Tips

1. Never commit `.env` files
2. Don't expose sensitive data in logs
3. Validate user inputs
4. Use HTTPS in production
5. Implement rate limiting
6. Use parameterized queries
7. Enable CORS only for trusted origins
8. Keep dependencies updated: `npm audit`, `npm update`

## Useful Resources

- React Docs: https://react.dev
- Express.js Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com
- MDN Web Docs: https://developer.mozilla.org
- Tailwind CSS: https://tailwindcss.com

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000  # Mac/Linux
taskkill /F /PID <PID>  # Windows

# Or use different port
PORT=3001 npm start
```

### MongoDB Connection Issues

- Check MongoDB is running
- Verify connection string
- Check firewall settings
- For Atlas: whitelist IP address

### Email Not Working

- Verify Gmail credentials
- Generate App Password if using 2FA
- Check email address spelling
- Verify SMTP settings

### CORS Errors

- Check backend CORS configuration
- Ensure frontend URL matches whitelist
- Restart backend server

## Next Steps

1. ✅ Run `setup.bat` or manual setup
2. ✅ Start frontend: `npm start`
3. ✅ Start backend: `cd server && npm start`
4. ✅ Visit http://localhost:3000
5. ✅ Test enquiry form
6. ✅ Check email notifications
7. ✅ Access admin dashboard (if implemented)
8. ✅ Read DEPLOYMENT.md for production setup

---

**Questions?** Contact: info@cornerstonemathsphere.in
