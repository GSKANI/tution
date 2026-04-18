# Cornerstone MathSphere - Website

A fully-featured, responsive React web application for a Science & Mathematics tuition centre. Includes student enquiry forms, admin dashboard, email notifications, dark mode, and analytics tracking.

## 📁 Project Structure

```
cornerstone-mathsphere/
├── public/
│   └── index.html                 # Main HTML file
├── src/
│   ├── App.js                     # Main React component (all pages)
│   ├── AdminDashboard.js          # Admin panel for managing enquiries
│   ├── api.js                     # API service functions
│   └── index.js                   # React entry point
├── server/
│   ├── server.js                  # Express.js backend server
│   ├── package.json               # Backend dependencies
│   └── .env.example               # Backend environment template
├── package.json                   # Frontend dependencies
├── .env.example                   # Frontend environment template
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- MongoDB (local or MongoDB Atlas)
- Gmail account (for email notifications) or other SMTP service

### Step 1: Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Update with your API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

### Step 2: Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/cornerstone-mathsphere
   
   # Gmail Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   ADMIN_EMAIL=admin@cornerstonemathsphere.in
   ```

   **For Gmail:**
   - Enable 2-factor authentication on your Google account
   - Generate an "App Password" at https://myaccount.google.com/apppasswords
   - Use this app password in `EMAIL_PASSWORD`

5. **Start the server:**
   ```bash
   npm start
   # or with auto-reload (if nodemon installed):
   npm run dev
   ```
   
   Server will run at `http://localhost:5000`

## 🎨 Features

### Frontend
- ✅ **Multiple Pages**: Home, About, Courses, Fees, Contact, Enquiry
- ✅ **Responsive Design**: Mobile-first approach with smooth animations
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Form Handling**: Student enquiry & contact forms with validation
- ✅ **Navigation**: Smooth page transitions with scroll-to-top
- ✅ **Analytics Ready**: Event tracking integration

### Backend
- ✅ **Express.js Server**: RESTful API endpoints
- ✅ **MongoDB Integration**: Store enquiries, contacts, analytics
- ✅ **Email Notifications**: Automated confirmation & admin alerts
- ✅ **Admin API**: Manage enquiry statuses
- ✅ **Analytics Tracking**: Event logging system
- ✅ **CORS Enabled**: Production-ready configuration

### Admin Dashboard
- 📊 View all student enquiries
- 🔍 Filter by status (new, contacted, admitted, rejected)
- ✏️ Update enquiry statuses
- 📋 Track student information

## 🔗 API Endpoints

### Student Enquiry
```http
POST /api/submit-enquiry
Content-Type: application/json

{
  "name": "Student Name",
  "phone": "+91 XXXXX XXXXX",
  "email": "student@email.com",
  "std": "Class 12",
  "subject": "Mathematics",
  "exam": "JEE Mains",
  "batchTime": "Evening (5pm – 8pm)",
  "msg": "Interested in JEE preparation..."
}

Response: { success: true, enquiryId: "..." }
```

### Contact Form
```http
POST /api/submit-contact
Content-Type: application/json

{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+91 XXXXX XXXXX",
  "subject": "Query Subject",
  "message": "Message content..."
}

Response: { success: true, message: "Message sent successfully" }
```

### Analytics
```http
POST /api/analytics
Content-Type: application/json

{
  "event": "page_viewed",
  "data": { "page": "home", "userId": "..." },
  "timestamp": "2024-01-01T12:00:00Z"
}

Response: { success: true }
```

### Admin Endpoints
```http
GET /api/admin/enquiries?status=new
PUT /api/admin/enquiries/:id
  { "status": "contacted", "notes": "Called student" }
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
git push  # Automatic deployment
# or
npm run build
# then deploy the `build/` folder
```

### Backend (Heroku/Railway/Render)

1. **Push to git:**
   ```bash
   git push heroku main
   ```

2. **Or deploy to Railway:**
   - Connect your repo to Railway
   - Add environment variables
   - Deploy automatically

## 🛠️ Technology Stack

**Frontend:**
- React 18
- CSS-in-JS (inline styles)
- Fetch API for HTTP requests

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Nodemailer for emails
- CORS enabled

## 📧 Email Setup

### Option 1: Gmail (Recommended for testing)
1. Enable 2FA on Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

### Option 2: Custom SMTP
Update `server.js` transporter config with your SMTP details.

## 🔐 Security Notes

- ⚠️ Never commit `.env` files with sensitive data
- 🔒 Use environment-specific configurations
- 🛡️ Validate all form inputs on backend
- 📝 Implement rate limiting for production
- 🔑 Use HTTPS in production

## 🚀 Production Checklist

- [ ] Add environment-specific error handling
- [ ] Implement request rate limiting
- [ ] Add authentication for admin dashboard
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly for production domain
- [ ] Add database backups
- [ ] Implement email queue system
- [ ] Add logging service (Winston/Morgan)
- [ ] Set up monitoring & alerts
- [ ] Cache frequently accessed data

## 📞 Support

For issues or feature requests:
- Email: info@cornerstonemathsphere.in
- Phone: +91 98765 43210

## 📄 License

This project is proprietary to Cornerstone MathSphere.

---

**Last Updated:** 2026-04-09
