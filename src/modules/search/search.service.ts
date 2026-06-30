import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}


  async findCheaperProducts(price: number) {
  return this.prisma.product.findMany({
    where: {
      sellingPrice: {
        lt: price,
      },
    },
    include: {
      inventory: true,
    },
    take: 3,
  });
}

async findSimilarProducts(
  productId: string,
  brand?: string,
) {
  return this.prisma.product.findMany({
    where: {
      id: {
        not: productId,
      },
      ...(brand && {
        brand: {
          equals: brand,
          mode: 'insensitive',
        },
      }),
    },
    include: {
      inventory: true,
    },
    take: 3,
  });
}

  async findByName(name: string) {
    return this.prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      include: {
        store: true,
        inventory: true,
        category: true,
      },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            brand: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            category: {
              is: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            store: {
              is: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      include: {
        store: true,
        inventory: true,
        category: true,
      },
    });
  }
}