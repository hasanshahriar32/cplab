#!/bin/bash

# Setup script for Cyber Physical Lab project
echo "🚀 Setting up Cyber Physical Lab project..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created! Please update it with your actual values."
    echo ""
    echo "📋 You need to set:"
    echo "   - DATABASE_URI (MongoDB connection string)"
    echo "   - PAYLOAD_SECRET (32+ character secret key)"
    echo "   - BLOB_READ_WRITE_TOKEN (Vercel Blob Storage token)"
    echo "   - JWT_SECRET (32+ character JWT secret)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
elif command -v yarn &> /dev/null; then
    yarn install
else
    npm install
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual values"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000/admin to access admin panel"
echo "4. For deployment, see DEPLOYMENT.md"
