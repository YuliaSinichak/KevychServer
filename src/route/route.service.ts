import { Injectable, NotFoundException } from '@nestjs/common';
import { Route, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RouteService {
  routeRepository: any;
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<Route> {
    return this.prisma.route.create({
      data: data,
    });
  }
  async search(data: {
    departureStation: string;
    arrivalStation: string;
    departureDate: Date;
  }): Promise<Route[]> {
    const { departureStation, arrivalStation, departureDate } = data;

    const startOfDay = new Date(departureDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(departureDate);
    endOfDay.setHours(23, 59, 59, 999);

    const routes = await this.prisma.route.findMany({
      where: {
        departureStation: departureStation,
        arrivalStation: arrivalStation,
        departureDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return routes;
  }

  async findAll(): Promise<Route[]> {
    return this.prisma.route.findMany({
      orderBy: {
        departureDate: 'asc',
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    try {
      await this.prisma.route.delete({
        where: { id: numericId },
      });
    } catch (error) {
      console.error('Error deleting route:', error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`Route with ID ${id} not found`);
      }
      throw new Error(
        `An error occurred while deleting the route: ${error.message}`,
      );
    }
  }
}
