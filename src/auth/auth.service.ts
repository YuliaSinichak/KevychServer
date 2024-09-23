import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<User> {
    return this.prisma.user.create({
      data: data,
    });
  }
  async findOne(condition: any) {
    return this.prisma.user.findFirst({
      where: condition,
    });
  }
}
