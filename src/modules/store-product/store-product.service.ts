import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StoreProductService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getPrices(productName: string) {
    return this.prisma.storeProduct.findMany({
      where: {
        product: {
          name: {
            contains: productName,
            mode: 'insensitive',
          },
        },
      },
      include: {
        store: true,
        product: true,
      },
      orderBy: {
        price: 'asc',
      },
    });
  }

  async getCheapest(productName: string) {
    return this.prisma.storeProduct.findFirst({
      where: {
        product: {
          name: {
            contains: productName,
            mode: 'insensitive',
          },
        },
      },
      include: {
        store: true,
        product: true,
      },
      orderBy: {
        price: 'asc',
      },
    });
  }
}