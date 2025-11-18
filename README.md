# Transmetro-API

Backend for real-time bus tracking, developed with **NestJS** following a structure based on **Hexagonal Architecture (Ports & Adapters)**.

**Quick summary**
- **Purpose**: Provide REST APIs for geolocation, route management, and notifications.
- **Stack**: TypeScript + NestJS, MongoDB (geospatial) and PostgreSQL (transactional), integrations with Google Maps Platform.

**Architecture (Hexagonal)**
The application is organized into layers that follow the pattern Ports & Adapters:

- **Domain (`src/domain`)**: contains the entities and contracts of the domain (Pure model). Example.: `bus.entity.ts`, repositories as contracts in `bus.repository.ts`.
- **Application (`src/application`)**: Use cases, Dtos and PORTS (interfaces) that define the system's operations. Example.: `application/use-cases/bus-service.ts`, `application/ports/ports.ts`, `application/dtos/bus-dto.ts`.
- **Infrastructure / Adapters (`src/infrastructure`)**: specific adapters that implement ports to interact with the outside world:
	- **Controllers HTTP**: `src/infrastructure/controllers/bus-controller.ts` (show the endpoints REST).
	- **Persistence**:
		- MongoDB adapter: `src/infrastructure/persistence/mongo/mongo.ts` (geolocation and geospatial data).
		- PostgreSQL adapter: `src/infrastructure/persistence/postgres/postgres.ts` (transactional data).
	- **APIs external**: `src/infrastructure/external/google-plarform/api.ts` (integration with Google Maps).

This separation facilitates testing, adapter replacement (for example, switching from Mongo to another storage system), and keeps the domain independent of technologies.

**Project main structure**

Tree Base (relevant selection):

```
src/
	app.module.ts
	main.ts
	application/
		dtos/
			bus-dto.ts
		ports/
			ports.ts
		use-cases/
			bus-service.ts
	domain/
		bus/
			bus.entity.ts
			bus.repository.ts
		user/
			user.entity.ts
			user.reposiotory.ts
	infrastructure/
		controllers/
			bus-controller.ts
		external/
			google-plarform/
		persistence/
			mongo/
			postgres/
				
```

**Technologies and Tools**

- **Framework**: `NestJS` with TypeScript
- **Databases**: `MongoDB` (support geoespacial) & `PostgreSQL`
- **External services**: Google Maps Platform (geocoding, routes)



**Development environment (example)**

Install dependencies:
```
npm install
```
Mode development
```
npm run start:dev
```
Build y execution (Production):
```
npm run build
npm run start:prod
```

## Docker Development Environment

This project includes full Docker support with PostgreSQL and MongoDB databases.

### Prerequisites

Install Docker and Docker Compose:
- **Docker Desktop** (Mac/Windows): https://www.docker.com/products/docker-desktop
- **Docker Engine** (Linux): https://docs.docker.com/engine/install/

### Quick Start

1. **Clone and setup environment:**
```bash
git clone <repository-url>
cd app_transmetro/app
cp .env.example .env
# Edit .env with your Google Maps API key
```

2. **Start all services:**
```bash
docker compose up --build
```

This will start:
- **NestJS API** on http://localhost:3000
- **PostgreSQL** on localhost:5432
- **MongoDB** on localhost:27017

3. **Stop services:**
```bash
docker compose down
```

### Docker Services

- **app**: NestJS application with hot-reload enabled
- **postgres**: PostgreSQL 15 for transactional data
- **mongodb**: MongoDB 7 for geospatial data

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Database settings (pre-configured for Docker)
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=transmetro_db
POSTGRES_USER=transmetro_user
POSTGRES_PASSWORD=transmetro_password

MONGODB_HOST=mongodb
MONGODB_PORT=27017
MONGODB_DB=transmetro_mongo
MONGODB_USER=transmetro_user
MONGODB_PASSWORD=transmetro_password
```

### Development Workflow

1. **Start environment:**
```bash
docker compose up
```

2. **View logs:**
```bash
docker compose logs -f app
```

3. **Access databases:**
```bash
# PostgreSQL
docker exec -it transmetro_postgres psql -U transmetro_user -d transmetro_db

# MongoDB
docker exec -it transmetro_mongodb mongosh -u transmetro_user -p transmetro_password
```

4. **Rebuild after changes:**
```bash
docker compose up --build
```

### Production Deployment

For production deployment:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

**Contribution and development notes**

- Business logic must be implemented in `src/domain` y `src/application`.
- Drivers and persistence adapters must be kept in `src/infrastructure`.
- To add a new source/persistence, create an adapter that implements the ports defined in `src/application/ports`.


##  Project Status
**Under Development** - DEMO version for integrative project presentation

*Complementary Frontend: [Transmetro-Platform](https://github.com/angel-iscoding/Transmetro-Aplication)*
