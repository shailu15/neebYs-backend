import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InventoryQueryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getProductInventory(productId: string) {
  return this.prisma.inventory.findUnique({
    where: {
      productId,
    },
  });
}

  async lowStock(limit: number = 10) {
    return this.prisma.inventory.findMany({
      where: {
        quantity: {
          lte: limit,
        },
      },
      include: {
        product: true,
      },
    });
  }
}