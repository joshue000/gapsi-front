# 🐳 Docker Execution Guide

## Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/get-started))
- Docker Desktop must be running

## 🚀 Quick Start

### Option 1: Automated Script (Recommended)

```bash
# Grant execution permissions (first time only)
chmod +x run-docker.sh stop-docker.sh

# Start the application
./run-docker.sh
```

The application will be available at: **http://localhost:4200**

### Option 2: Manual Docker Commands

```bash
# 1. Build the image
docker build -t gapsi-front .

# 2. Run the container
docker run -d --name gapsi-front-app -p 4200:80 gapsi-front

# 3. Access the application
# Open http://localhost:4200 in your browser
```

## 🛑 Stop the Application

### With Script

```bash
./stop-docker.sh
```

### Manual

```bash
# Stop container
docker stop gapsi-front-app

# Remove container
docker rm gapsi-front-app

# Remove image (optional)
docker rmi gapsi-front
```

## 📋 Useful Commands

```bash
# View logs in real-time
docker logs -f gapsi-front-app

# View running containers
docker ps

# View all images
docker images

# Restart container
docker restart gapsi-front-app

# Access the container
docker exec -it gapsi-front-app sh
```

## 🔧 Troubleshooting

### Error: "Docker is not installed"
- Install Docker Desktop from https://www.docker.com/get-started

### Error: "Docker is not running"
- Open Docker Desktop and wait for it to start completely

### Error: "Port 4200 is already in use"
```bash
# Change the port in run-docker.sh or use:
docker run -d --name gapsi-front-app -p 8080:80 gapsi-front
# Access at http://localhost:8080
```

### Error: "Permission denied"
```bash
# Grant execution permissions
chmod +x run-docker.sh stop-docker.sh
```

## 📦 Project Structure

```
gapsi-front/
├── Dockerfile              # Docker configuration
├── nginx.conf             # Nginx configuration
├── run-docker.sh          # Script to start
├── stop-docker.sh         # Script to stop
└── DOCKER_README.md       # This guide
```

## 🎯 Features

- ✅ Multi-stage build for size optimization
- ✅ Nginx as web server
- ✅ Port 4200 (configurable)
- ✅ Automated scripts
- ✅ Easy to use

## 📝 Notes

- First execution may take several minutes (downloading dependencies)
- Subsequent executions are faster (uses cache)
- Container runs in detached mode (-d)
- Logs can be viewed with `docker logs -f gapsi-front-app`
