import { Controller, Get } from '@nestjs/common';
import { BusService } from '../../application/use-cases/bus-service';

@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  getHello(): string {
    return this.busService.getHello();
  }
}
