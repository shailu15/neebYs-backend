import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
  ) {
    return this.prisma.inventory.upsert({
      where: {
        productId:
          createInventoryDto.productId,
      },
      update: {
        quantity:
          createInventoryDto.quantity,
      },
      create: {
        productId:
          createInventoryDto.productId,
        quantity:
          createInventoryDto.quantity,
      },
    });
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      include: {
        product: true,
      },
    });
  }
}