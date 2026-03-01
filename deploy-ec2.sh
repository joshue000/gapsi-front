#!/bin/bash

# EC2 Deployment Script for Gapsi Front
# Run this script on your EC2 instance

set -e

echo "🚀 Starting EC2 deployment..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y || sudo apt-get update -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    sudo yum install docker -y || sudo apt-get install docker.io -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
fi

# Install Git if not installed
if ! command -v git &> /dev/null; then
    echo "📥 Installing Git..."
    sudo yum install git -y || sudo apt-get install git -y
fi

# Clone repository
REPO_DIR="/home/ec2-user/gapsi-front"
if [ -d "$REPO_DIR" ]; then
    echo "📂 Updating existing repository..."
    cd $REPO_DIR
    git pull
else
    echo "📥 Cloning repository..."
    cd /home/ec2-user
    git clone https://github.com/joshue000/gapsi-front.git
    cd gapsi-front
fi

# Stop existing container
echo "🛑 Stopping existing container..."
sudo docker stop gapsi-front-app 2>/dev/null || true
sudo docker rm gapsi-front-app 2>/dev/null || true

# Build Docker image
echo "🔨 Building Docker image..."
sudo docker build -t gapsi-front .

# Run container
echo "▶️  Starting container..."
sudo docker run -d \
    --name gapsi-front-app \
    --restart unless-stopped \
    -p 80:80 \
    gapsi-front

# Check status
echo "✅ Deployment complete!"
echo "🌐 Application running at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo ""
echo "📊 Container status:"
sudo docker ps | grep gapsi-front-app
