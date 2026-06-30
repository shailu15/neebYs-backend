import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ===== Existing methods for Auth =====

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // ===== Methods for NeebYs AI Login =====

  async findByName(
    name: string,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createGuest(
    name: string,
  ): Promise<User> {
    const email =
      `${name.toLowerCase()}@neebys.local`;

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: 'guest',
      },
    });
  }
}