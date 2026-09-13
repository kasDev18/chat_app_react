#!/bin/bash

# Quick Test Script for Chat App Docker Setup
# Run this first to quickly validate your setup

set -e

echo "🔍 Quick Docker Setup Test"
echo "=========================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# Quick checks
print_info "Checking prerequisites..."

# Check Docker
if ! docker --version > /dev/null 2>&1; then
    print_error "Docker not found. Please install Docker first."
    exit 1
fi
print_success "Docker is available"

# Check Docker Compose
if ! docker-compose --version > /dev/null 2>&1; then
    print_error "Docker Compose not found. Please install Docker Compose first."
    exit 1
fi
print_success "Docker Compose is available"

# Check if required files exist
print_info "Checking required files..."

required_files=(
    "server/Dockerfile"
    "client/Dockerfile"
    "docker-compose.yml"
    "server/package.json"
    "client/package.json"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Found $file"
    else
        print_error "Missing $file"
        exit 1
    fi
done

# Create environment files for testing
print_info "Creating environment files for testing..."

# Create server .env file from env.example
if [ -f "server/env.example" ]; then
    cp server/env.example server/.env
    print_success "Created server/.env from env.example"
else
    print_error "server/env.example not found"
    exit 1
fi

# Create client .env file
cat > client/.env << EOF
VITE_SERVER_URL=http://localhost:5001
EOF
print_success "Created client/.env with VITE_SERVER_URL"

# Quick build test
print_info "Testing Docker builds..."

# Test backend build
print_info "Building backend image..."
if docker build -t test-backend ./server > /dev/null 2>&1; then
    print_success "Backend builds successfully"
else
    print_error "Backend build failed"
    # Cleanup environment files
    rm -f server/.env client/.env
    exit 1
fi

# Test frontend build
print_info "Building frontend image..."
if docker build -t test-frontend ./client > /dev/null 2>&1; then
    print_success "Frontend builds successfully"
else
    print_error "Frontend build failed"
    # Cleanup environment files
    rm -f server/.env client/.env
    exit 1
fi

# Cleanup test images and environment files
docker rmi test-backend test-frontend > /dev/null 2>&1 || true
rm -f server/.env client/.env

print_success "Quick test completed successfully!"
echo ""
echo "🎉 Your Docker setup looks good!"
echo "Run './test-deployment.sh' for a full deployment test."

