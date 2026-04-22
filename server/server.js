// Backend Server for Cornerstone MathSphere
// Express.js server with MongoDB & Email Integration

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ─────────────────────────────────────────────
   MIDDLEWARE
───────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* ─────────────────────────────────────────────
   DATABASE CONNECTION
───────────────────────────────────────────── */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cornerstone-mathsphere';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err.message));

/* ─────────────────────────────────────────────
   EMAIL CONFIGURATION
───────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'cornerstonemathsphere@gmail.com',
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('✗ Email send error:', error.message);
    return false;
  }
};

/* ─────────────────────────────────────────────
   SCHEMAS & MODELS
───────────────────────────────────────────── */
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
    std: String,
    subject: String,
    exam: String,
    message: String,
    batchTime: String,
    status: { type: String, default: 'new' }, // new, contacted, admitted, rejected
    notes: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    subject: String,
    message: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const analyticsSchema = new mongoose.Schema(
  {
    event: String,
    data: mongoose.Schema.Types.Mixed,
    timestamp: Date,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
const Contact = mongoose.model('Contact', contactSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);

/* ─────────────────────────────────────────────
   EMAIL TEMPLATES
───────────────────────────────────────────── */
const enquiryConfirmationTemplate = (name) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: 'Outfit', sans-serif; color: #0b1f3a; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #0b1f3a; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .footer { background: #f8f5ef; padding: 20px; text-align: center; color: #999; }
      .btn { background: #d4a837; color: #0b1f3a; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Cornerstone MathSphere</h1>
        <p>Science & Mathematics Tuition Centre</p>
      </div>
      <div class="content">
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for your enquiry! We have received your information and our admissions team will contact you within 24 hours to discuss your learning needs.</p>
        <p>If you have any urgent questions, please contact us at:</p>
        <ul>
          <li>📞 +91 95859 79804</li>
          <li>📧 cornerstonemathsphere@gmail.com</li>
        </ul>
        <p>Best regards,<br><strong>Cornerstone MathSphere Team</strong></p>
      </div>
      <div class="footer">
        <p>© 2026 Cornerstone MathSphere. All rights reserved.</p>
        <p>K.pudur, Madurai-625007</p>
      </div>
    </div>
  </body>
</html>
`;

const adminNotificationTemplate = (enquiry) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: 'Outfit', sans-serif; color: #0b1f3a; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
      th { background: #f8f5ef; }
    </style>
  </head>
  <body>
    <h2>New Enquiry Received</h2>
    <table>
      <tr><th>Field</th><th>Value</th></tr>
      <tr><td>Name</td><td>${enquiry.name}</td></tr>
      <tr><td>Email</td><td>${enquiry.email || 'N/A'}</td></tr>
      <tr><td>Phone</td><td>${enquiry.phone}</td></tr>
      <tr><td>Class</td><td>${enquiry.std || 'N/A'}</td></tr>
      <tr><td>Subject</td><td>${enquiry.subject || 'N/A'}</td></tr>
      <tr><td>Exam</td><td>${enquiry.exam || 'N/A'}</td></tr>
      <tr><td>Batch Time</td><td>${enquiry.batchTime || 'N/A'}</td></tr>
      <tr><td>Message</td><td>${enquiry.message || 'N/A'}</td></tr>
      <tr><td>Received At</td><td>${new Date().toLocaleString()}</td></tr>
    </table>
    <p><strong>Action Required:</strong> Review and contact the student within 24 hours.</p>
  </body>
</html>
`;

/* ─────────────────────────────────────────────
   API ENDPOINTS
───────────────────────────────────────────── */

// Submit Enquiry
app.post('/api/submit-enquiry', async (req, res) => {
  try {
    const { name, phone, email, std, subject, exam, batchTime, msg } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      std,
      subject,
      exam,
      batchTime,
      message: msg,
    });

    await enquiry.save();

    // Send confirmation email to student
    if (email) {
      await sendEmail(email, 'Enquiry Received - Cornerstone MathSphere', enquiryConfirmationTemplate(name));
    }

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'cornerstonemathsphere@gmail.com';
    await sendEmail(adminEmail, `New Enquiry: ${name}`, adminNotificationTemplate(enquiry));

    // Trigger Analytics
    await new Analytics({
      event: 'enquiry_submitted',
      data: { name, subject, exam },
      timestamp: new Date(),
    }).save();

    res.status(201).json({ success: true, message: 'Enquiry submitted successfully', enquiryId: enquiry._id });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

// Submit Contact Message
app.post('/api/submit-contact', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();

    // Send acknowledgment to user
    if (email) {
      const ackTemplate = `
        <h2>Thank you for contacting us!</h2>
        <p>We have received your message and will respond within 24 hours.</p>
      `;
      await sendEmail(email, 'Message Received - Cornerstone MathSphere', ackTemplate);
    }

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || 'cornerstonemathsphere@gmail.com';
    await sendEmail(adminEmail, `New Contact Message from ${name}`, `
      <h3>New Message:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
      <p><strong>Message:</strong> ${message}</p>
    `);

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Analytics Endpoint
app.post('/api/analytics', async (req, res) => {
  try {
    const { event, data, timestamp } = req.body;

    await new Analytics({
      event,
      data,
      timestamp: timestamp || new Date(),
    }).save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to save analytics' });
  }
});

// Admin: Get all enquiries
app.get('/api/admin/enquiries', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// Admin: Update enquiry status
app.put('/api/admin/enquiries/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'alive', timestamp: new Date().toISOString() });
});

/* ─────────────────────────────────────────────
   SERVER STARTUP
───────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n🚀 Cornerstone MathSphere Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`🗄️  Database: ${MONGO_URI.split('://')[1]}\n`);
});
