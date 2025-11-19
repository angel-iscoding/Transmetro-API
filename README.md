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
Development mode
```
npm run start:dev
```
Build and run (Production):
```
npm run build
npm run start:prod
```

**Centralized Configuration**
- **Description**: Configuration has been centralized under `src/config` and validated with `zod` and `@nestjs/config`. This normalizes environment variables and exposes a typed `AppConfig` consumable by the application.
- **Key files**: `src/config/env.schema.ts`, `src/config/types.ts`, `src/config/transform.ts`, `src/config/configuration.ts`, `src/config/index.ts`, `src/config/config.module.ts`.
- **Support files**: added `.env.example`, `.env.docker`, `docker-compose.yml` and `docs/CONFIGURATION.md` with examples and recommended practices.
- **Flow**: `ConfigModule.forRoot({ validate: validateEnv })` validates `process.env` (or `.env` files), `validateEnv` transforms into `AppConfig`, and `APP_CONFIG` is injected where needed via `getAppConfig`.


Example `.env` (example values):

```dotenv
# App
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
CORS_ORIGINS=http://localhost:3000


# PostgreSQL: either provide POSTGRES_URI or the parts below
# Example POSTGRES_URI: postgresql://user:password@host:5432/dbname
POSTGRES_URI=uri
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=postgresdb

# MongoDB: either provide MONGO_URI or the parts below
# Example MONGO_URI: mongodb://user:password@host:27017/dbname
MONGO_URI=uri
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=mongodb
MONGO_PASSWORD=your_password
MONGO_DB=mongodb

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

# External services
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

##  Project Status
**Under Development** - DEMO version for integrative project presentation

*Complementary Frontend: [Transmetro-Platform](https://github.com/angel-iscoding/Transmetro-Aplication)*