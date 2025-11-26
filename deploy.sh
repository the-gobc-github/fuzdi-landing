#!/bin/bash

# Simple deployment script for fuzdi-landing

set -e

APP_NAME="fuzdi-landing"
DOCKER_IMAGE="${APP_NAME}"
PORT=3000

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

case "${1:-help}" in
    "dev")
        log_info "Starting development environment..."
        docker-compose up --build
        ;;
    "build")
        log_info "Building Docker image..."
        docker build -t ${DOCKER_IMAGE}:latest .
        log_success "Build completed"
        ;;
    "start")
        log_info "Starting production container..."
        docker run -d --name ${APP_NAME} -p ${PORT}:3000 ${DOCKER_IMAGE}:latest
        log_success "Container started on port ${PORT}"
        ;;
    "stop")
        log_info "Stopping container..."
        docker stop ${APP_NAME} && docker rm ${APP_NAME}
        log_success "Container stopped"
        ;;
    "logs")
        docker logs -f ${APP_NAME}
        ;;
    *)
        echo "Usage: $0 [COMMAND]"
        echo "Commands:"
        echo "  dev    - Start development with Docker Compose"
        echo "  build  - Build Docker image"
        echo "  start  - Start production container"
        echo "  stop   - Stop container"
        echo "  logs   - Show container logs"
        ;;
esac

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Build Docker image
build_image() {
    local env=${1:-production}
    log_info "Building Docker image for $env environment..."
    
    if [ "$env" = "development" ]; then
        docker build --target development -t ${DOCKER_IMAGE}:dev .
    else
        docker build --target production -t ${DOCKER_IMAGE}:latest .
    fi
    
    log_success "Docker image built successfully"
}

# Stop and remove existing container
cleanup_container() {
    log_info "Cleaning up existing container..."
    
    if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Stopping existing container..."
        docker stop ${CONTAINER_NAME} || true
        
        log_info "Removing existing container..."
        docker rm ${CONTAINER_NAME} || true
    fi
}

# Run container
run_container() {
    local env=${1:-production}
    local port=${2:-$PORT}
    
    log_info "Starting container in $env mode on port $port..."
    
    if [ "$env" = "development" ]; then
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${port}:3000 \
            -v $(pwd):/app \
            -v /app/node_modules \
            -e NODE_ENV=development \
            -e NEXT_PUBLIC_BASE_URL=http://localhost:${port} \
            -e NEXT_PUBLIC_API_URL=http://localhost:${port}/api \
            ${DOCKER_IMAGE}:dev
    else
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${port}:3000 \
            -e NODE_ENV=production \
            -e NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL:-http://localhost:${port}} \
            -e NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:${port}/api} \
            --restart unless-stopped \
            ${DOCKER_IMAGE}:latest
    fi
    
    log_success "Container started successfully"
    log_info "Application available at: http://localhost:${port}"
}

# Health check
health_check() {
    local port=${1:-$PORT}
    local max_attempts=30
    local attempt=1
    
    log_info "Performing health check..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s http://localhost:${port}/api/health > /dev/null 2>&1; then
            log_success "Health check passed!"
            return 0
        fi
        
        log_info "Attempt $attempt/$max_attempts - waiting for application to start..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# Show logs
show_logs() {
    docker logs -f ${CONTAINER_NAME}
}

# Deploy function
deploy() {
    local env=${1:-production}
    local port=${2:-$PORT}
    
    log_info "Starting deployment in $env mode..."
    
    check_docker
    cleanup_container
    build_image $env
    run_container $env $port
    
    if health_check $port; then
        log_success "Deployment completed successfully!"
        log_info "Container name: ${CONTAINER_NAME}"
        log_info "Image: ${DOCKER_IMAGE}:$([ "$env" = "development" ] && echo "dev" || echo "latest")"
        log_info "Port: ${port}"
    else
        log_error "Deployment failed - health check unsuccessful"
        log_warning "Check logs with: docker logs ${CONTAINER_NAME}"
        exit 1
    fi
}

# Production deployment with Docker Swarm/Stack
deploy_stack() {
    log_info "Deploying with Docker Stack..."
    
    # Create docker-compose.prod.yml if it doesn't exist
    if [ ! -f "docker-compose.prod.yml" ]; then
        log_warning "docker-compose.prod.yml not found, creating basic one..."
        cat > docker-compose.prod.yml << EOF
version: '3.8'

services:
  app:
    image: ${DOCKER_IMAGE}:latest
    ports:
      - "${PORT}:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_BASE_URL=\${NEXT_PUBLIC_BASE_URL}
      - NEXT_PUBLIC_API_URL=\${NEXT_PUBLIC_API_URL}
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  default:
    driver: overlay
EOF
    fi
    
    build_image production
    docker stack deploy -c docker-compose.prod.yml ${APP_NAME}
    log_success "Stack deployed successfully!"
}

# Rollback function
rollback() {
    log_warning "Rolling back deployment..."
    
    # Stop current container
    cleanup_container
    
    # Try to find and run previous image
    local previous_image=$(docker images --format "table {{.Repository}}:{{.Tag}}" | grep ${DOCKER_IMAGE} | sed -n '2p')
    
    if [ -n "$previous_image" ]; then
        log_info "Rolling back to: $previous_image"
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${PORT}:3000 \
            -e NODE_ENV=production \
            --restart unless-stopped \
            $previous_image
        
        if health_check; then
            log_success "Rollback completed successfully!"
        else
            log_error "Rollback failed"
            exit 1
        fi
    else
        log_error "No previous image found for rollback"
        exit 1
    fi
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy ${2:-production} ${3:-$PORT}
        ;;
    "dev")
        deploy development ${2:-3000}
        ;;
    "build")
        check_docker
        build_image ${2:-production}
        ;;
    "start")
        cleanup_container
        run_container ${2:-production} ${3:-$PORT}
        ;;
    "stop")
        log_info "Stopping container..."
        docker stop ${CONTAINER_NAME} || true
        log_success "Container stopped"
        ;;
    "restart")
        log_info "Restarting container..."
        docker restart ${CONTAINER_NAME} || true
        health_check
        log_success "Container restarted"
        ;;
    "logs")
        show_logs
        ;;
    "health")
        health_check ${2:-$PORT}
        ;;
    "stack")
        deploy_stack
        ;;
    "rollback")
        rollback
        ;;
    "clean")
        log_info "Cleaning up..."
        cleanup_container
        docker rmi ${DOCKER_IMAGE}:latest 2>/dev/null || true
        docker rmi ${DOCKER_IMAGE}:dev 2>/dev/null || true
        log_success "Cleanup completed"
        ;;
    "help"|*)
        echo "Usage: $0 [COMMAND] [ENVIRONMENT] [PORT]"
        echo ""
        echo "Commands:"
        echo "  deploy [env] [port]  - Deploy application (default: production, 3000)"
        echo "  dev [port]           - Deploy in development mode (default: 3000)"
        echo "  build [env]          - Build Docker image only"
        echo "  start [env] [port]   - Start container (without rebuilding)"
        echo "  stop                 - Stop container"
        echo "  restart              - Restart container"
        echo "  logs                 - Show container logs"
        echo "  health [port]        - Check application health"
        echo "  stack                - Deploy with Docker Stack"
        echo "  rollback             - Rollback to previous version"
        echo "  clean                - Remove container and images"
        echo "  help                 - Show this help"
        echo ""
        echo "Examples:"
        echo "  $0 deploy production 3000"
        echo "  $0 dev 3001"
        echo "  $0 build development"
        echo "  $0 health 3000"
        ;;
esac