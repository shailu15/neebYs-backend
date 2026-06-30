import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommerceIntelligenceService } from './commerce-intelligence.service';

@Injectable()
export class KnowledgeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly intelligence: CommerceIntelligenceService,
  ) {}

  async getKnowledge(query: string) {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        inventory: true,
        store: true,
        category: true,
      },
    });

    const totalProducts = products.length;

    const totalStock = products.reduce((sum, product) => {
      return sum + (product.inventory?.quantity ?? 0);
    }, 0);

    const prices = products.map(
      (product) => product.sellingPrice ?? 0,
    );

    const lowestPrice =
      prices.length > 0 ? Math.min(...prices) : 0;

    const highestPrice =
      prices.length > 0 ? Math.max(...prices) : 0;

    const stores = [
      ...new Set(
        products
          .map((product) => product.store?.name)
          .filter(Boolean),
      ),
    ];

    const aiSummary = this.intelligence.generateSummary({
      totalProducts,
      totalStock,
      lowestPrice,
      highestPrice,
      storesFound: stores.length,
    });

    return {
      query,

      summary: {
        totalProducts,
        totalStock,
        lowestPrice,
        highestPrice,
        storesFound: stores.length,
      },

      aiSummary,

      products,
    };
  }
}