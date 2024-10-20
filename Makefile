# Variables
DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_FILE = docker-compose.yml

# Targets
.PHONY: build up down logs migrate-up migrate-down

# Build the Docker images
build:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build

# Start the Docker containers
up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

# Stop the Docker containers
down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

# View logs of the Docker containers
logs:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

# Run TypeORM migrations up
migrate-up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec app npm run migration:run

# Run TypeORM migrations down
migrate-down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec app npm run migration:revert
