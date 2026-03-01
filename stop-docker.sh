#!/bin/bash

# Script to stop and clean Gapsi Front project
# Usage: ./stop-docker.sh

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

CONTAINER_NAME="gapsi-front-app"
IMAGE_NAME="gapsi-front"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Stopping Gapsi Front${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Stop container
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo -e "${BLUE}Stopping container...${NC}"
    docker stop $CONTAINER_NAME
    echo -e "${GREEN}✓ Container stopped${NC}"
else
    echo -e "${BLUE}Container is not running${NC}"
fi

# Remove container
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo -e "${BLUE}Removing container...${NC}"
    docker rm $CONTAINER_NAME
    echo -e "${GREEN}✓ Container removed${NC}"
fi

# Ask if remove image
read -p "Do you want to remove the Docker image as well? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ "$(docker images -q $IMAGE_NAME)" ]; then
        echo -e "${BLUE}Removing image...${NC}"
        docker rmi $IMAGE_NAME
        echo -e "${GREEN}✓ Image removed${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Cleanup completed${NC}"
