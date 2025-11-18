# Docker Compose for Transmetro-API

## Container Architecture

This project includes Docker configuration to deploy the Transmetro-API application with all its services dependencies:

### Configured Services

- **API NestJS**: Application main in port 3000
- **MongoDB**: Geospatial database in port 27017
- **PostgreSQL**: Transactional database in port 5432
- **Redis**: Cache and sessions in port 6379
- **Nginx**: Reverse proxy in ports 80 and 443

## Quick Usage

### Production

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api
```

### Development

```bash
# Start in development mode (with hot reload)
docker-compose -f docker-compose.dev.yml up -d

# View logs in development
docker-compose -f docker-compose.dev.yml logs -f api
```

## Useful Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (be careful: you will lose data)
docker-compose down -v

# Rebuild API image
docker-compose build --no-cache api

# Access API container
docker-compose exec api sh

# Access MongoDB
docker-compose exec mongo mongosh

# Access PostgreSQL
docker-compose exec postgres psql -U transmetro_user -d transmetro
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
GOOGLE_MAPS_API_KEY=<your_api_key_here>
```

## Volumes Structure

- `mongo_data`: Persistent MongoDB data
- `postgres_data`: Persistent PostgreSQL data
- `redis_data`: Redis data

## Network Configuration

All services communicate through the isolated `transmetro-network`.

## Important Notes

1. **Google Maps API Key**: You need to get an API key from Google Cloud Console
2. **Ports**: Services are exposed on standard ports for easier development
3. **Data**: Volumes persist data between container restarts
4. **Development Mode**: Includes volumes for hot reload of source code

## Troubleshooting

### Common Problems

1. **Database connection error**: Make sure containers are in the same network
2. **Google Maps API Key**: Verify that your API key has the necessary services enabled
3. **Permissions**: If you have permission issues, run with `sudo` or adjust Docker permissions

### Logs and Debugging

```bash
# View status of all containers
docker-compose ps

# View logs of a specific service
docker-compose logs api
docker-compose logs mongo
docker-compose logs postgres

# View logs in real-time
docker-compose logs -f api
```

## Customization

You can modify the `docker-compose.yml` and `docker-compose.dev.yml` files according to your specific needs:
- Change image versions
- Adjust resource configuration
- Modify exposed ports
- Add additional services
