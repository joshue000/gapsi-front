#!/bin/bash

# Script to build and run Gapsi Front project with Docker
# Usage: ./run-docker.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Gapsi Front - Docker Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    echo "Please install Docker from: https://www.docker.com/get-started"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker is not running${NC}"
    echo "Please start Docker Desktop"
    exit 1
fi

# Variables
IMAGE_NAME="gapsi-front"
CONTAINER_NAME="gapsi-front-app"
PORT=4200

# Stop and remove existing container if exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo -e "${BLUE}Stopping existing container...${NC}"
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
fi

# Build image
echo -e "${BLUE}Building Docker image...${NC}"
docker build -t $IMAGE_NAME .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Image built successfully${NC}"
else
    echo -e "${RED}✗ Error building image${NC}"
    exit 1
fi

# Run container
echo -e "${BLUE}Starting container...${NC}"
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ Application started successfully${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "🌐 Access the application at: ${BLUE}http://localhost:$PORT${NC}"
    echo ""
    echo "Useful commands:"
    echo "  - View logs:     docker logs -f $CONTAINER_NAME"
    echo "  - Stop:          docker stop $CONTAINER_NAME"
    echo "  - Restart:       docker restart $CONTAINER_NAME"
    echo "  - Remove:        docker rm -f $CONTAINER_NAME"
    echo ""
else
    echo -e "${RED}✗ Error starting container${NC}"
    exit 1
fi
