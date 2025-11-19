/**
 * Main application module using Hexagonal Architecture (Ports and Adapters)
 *
 * The architecture is structured into 3 main layers:
 * 1. Infrastructure (Adapters): Handles communication with the outside (API, DB, etc.)
 * 2. Application (Use Cases): Contains the application logic
 * 3. Domain (Entities): Contains business rules and entities
 */
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
// Infrastructure Layer (Primary and Secondary Adapters)
import { BusController } from './infrastructure/controllers/bus-controller';
// Application Layer (Use Cases)
import { BusService } from './application/use-cases/bus-service';

@Module({
  imports: [AppConfigModule], // Centralized configuration module

  // Controllers are primary (driven) adapters that receive HTTP requests
  controllers: [BusController],

  providers: [
    // BusService acts as a use case, orchestrating application logic
    BusService,

    // Dependency injection for the repository:
    // - 'BusRepository' is the port (interface) defined in the domain
    {
      provide: 'BusRepository',
      useClass: BusService, // In a real app, this would be a concrete implementation of the repository
    },
  ],
})
export class AppModule {}
