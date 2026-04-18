#!/bin/bash
# Setup script for Cornerstone MathSphere

echo "📚 Cornerstone MathSphere - Setup Script"
echo "========================================"
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
if [ ! -f ".env" ]; then
  echo "Creating .env from template..."
  cp .env.example .env
  echo "✓ Frontend .env created. Please update REACT_APP_API_URL if needed."
else
  echo "✓ Frontend .env already exists"
fi

echo ""
echo "📦 Installing frontend dependencies..."
npm install

# Server setup
echo ""
echo "🔧 Setting up Backend..."
cd server

if [ ! -f ".env" ]; then
  echo "Creating server/.env from template..."
  cp .env.example .env
  echo "✓ Backend .env created. Please configure:"
  echo "  - MONGO_URI (MongoDB connection string)"
  echo "  - EMAIL_USER & EMAIL_PASSWORD (Gmail credentials)"
  echo "  - ADMIN_EMAIL (Your admin email)"
else
  echo "✓ Backend .env already exists"
fi

echo ""
echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration:"
echo "   - Frontend: .env"
echo "   - Backend: server/.env"
echo ""
echo "2. For Gmail setup:"
echo "   - Enable 2FA: https://myaccount.google.com"
echo "   - Generate App Password: https://myaccount.google.com/apppasswords"
echo ""
echo "3. Ensure MongoDB is running locally or update MONGO_URI for cloud"
echo ""
echo "4. Run in development:"
echo "   - Terminal 1: npm start (frontend on port 3000)"
echo "   - Terminal 2: cd server && npm start (backend on port 5000)"
echo ""
