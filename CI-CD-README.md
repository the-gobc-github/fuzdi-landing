# Fuzdi Landing - Simple CI/CD Setup

## Overview
Simple CI/CD pipeline that builds Docker images and deploys to a server using Docker Swarm.

## GitHub Actions Workflow
Single workflow file: `.github/workflows/ci.yml`
- **Triggers**: Push to `main` branch
- **Actions**:
  1. Builds Docker image
  2. Pushes to Docker Hub
  3. Copies compose files to server
  4. Updates Docker Swarm service

## Required GitHub Secrets
Add these in Repository Settings → Secrets and variables → Actions:

- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password/token
- `SERVER_HOST` - Your server IP address
- `SERVER_USER` - SSH username (e.g., 'root')
- `SSH_PRIVATE_KEY` - Your SSH private key

## Local Development
```bash
# Start development environment
./deploy.sh dev

# Build Docker image
./deploy.sh build

# Start production container
./deploy.sh start

# View logs
./deploy.sh logs
```

## Server Setup
1. Initialize Docker Swarm: `docker swarm init`
2. Ensure Docker and Docker Compose are installed
3. The pipeline will handle the rest

## File Structure
- `docker-compose.yml` - Local development
- `docker-compose.swarm.yml` - Production deployment
- `Dockerfile` - Multi-stage build (dev/prod)
- `.github/workflows/ci.yml` - CI/CD pipeline

## Available Scripts

```bash
# Development
npm run dev                 # Start development server
npm run docker:dev         # Start development with Docker

# Production
npm run build              # Build production application
npm start                  # Start production server
npm run docker:prod        # Start production with Docker

# Testing & Linting
npm run lint               # Run ESLint
npm run type-check         # TypeScript type checking
npm test                   # Run tests (when available)

# Docker
npm run docker:build       # Build Docker image
npm run docker:build-prod  # Build production Docker image
```

## Docker Commands

```bash
# Development
docker-compose up app

# Production testing
docker-compose up app-prod

# Build images
docker build -t fuzdi-landing .
docker build --target production -t fuzdi-landing:prod .
```

## Deployment Customization

The workflow files include commented examples for common deployment scenarios:

1. **Docker Registry**: Push images to Docker Hub, ECR, or other registries
2. **SSH Deployment**: Deploy directly to servers via SSH
3. **Cloud Platforms**: Adapt for AWS ECS, Google Cloud Run, etc.

Uncomment and modify the relevant sections based on your deployment target.

## Branch Strategy

- `main`: Production-ready code, triggers production deployment
- `develop`: Development code, triggers staging deployment
- Feature branches: Create pull requests to `develop`

## Security Notes

- Docker images run as non-root user (`nextjs`)
- Environment variables are properly handled
- Secrets are managed through GitHub Secrets
- Production builds exclude development dependencies

## Monitoring & Logging

Consider adding:
- Health check endpoints
- Application monitoring (e.g., Sentry)
- Log aggregation
- Performance monitoring