import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  create(createStoreDto: CreateStoreDto) {
    return this.prisma.store.create({
      data: createStoreDto,
    });
  }

  findAll() {
  return this.prisma.store.findMany({
    include: {
      products: {
        include: {
          inventory: true,
        },
      },
    },
  });
}
}