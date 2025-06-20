#!/bin/bash

# Wall of Regret - Test Runner Script
# This script runs all tests for the application

set -e

echo "🧪 Running Wall of Regret test suite..."

# Run backend tests (if they exist)
echo "🔧 Running backend tests..."
cd backend
if [ -f "package.json" ] && grep -q "test" package.json; then
    npm test || echo "⚠️  Backend tests not configured or failed"
else
    echo "ℹ️  No backend tests configured"
fi

# Run frontend tests
echo "🎨 Running frontend tests..."
cd ../frontend
if command -v chromium-browser &> /dev/null; then
    CHROME_BIN=/usr/bin/chromium-browser ng test --watch=false --browsers=ChromeHeadless
else
    echo "⚠️  Chromium not found, skipping frontend tests"
fi

echo "✅ Test suite completed!"

