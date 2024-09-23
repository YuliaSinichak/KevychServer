import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RouteService } from './route.service';
import { Route } from '@prisma/client';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post('addRoute')
  async addRoute(
    @Body('train') train: string,
    @Body('departureStation') departureStation: string,
    @Body('arrivalStation') arrivalStation: string,
    @Body('departureDate') departureDate: Date,
    @Body('arrivalDate') arrivalDate: Date,
  ) {
    const route = await this.routeService.create({
      train,
      departureStation,
      arrivalStation,
      arrivalDate,
      departureDate,
    });

    return { route };
  }

  @Get('routes')
  async routes(): Promise<Route[]> {
    return this.routeService.findAll();
  }

  @Delete(':id')
  async routeDelete(@Param('id') id: string): Promise<void> {
    await this.routeService.deleteById(id);
  }

  @Post('search')
  async search(
    @Body('departureStation') departureStation: string,
    @Body('arrivalStation') arrivalStation: string,
    @Body('departureDate') departureDate: Date,
  ) {
    const data = {
      departureStation,
      arrivalStation,
      departureDate,
    };

    const routes = await this.routeService.search(data);

    return routes;
  }
}
