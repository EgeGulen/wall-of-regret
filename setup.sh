#!/bin/bash

# Wall of Regret - Development Setup Script
# This script sets up the development environment for the Wall of Regret application

set -e

echo "🚀 Setting up Wall of Regret development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Return to root directory
cd ..

echo "🎉 Setup complete!"
echo ""
echo "To start the development servers:"
echo "1. Backend: cd backend && npm run start:dev"
echo "2. Frontend: cd frontend && ng serve"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:4200"
echo "- Backend API: http://localhost:3000"

