import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EnrichmentService } from '../enrichment/enrichment.service';

@Injectable()
export class MatcherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly enrichmentService: EnrichmentService,
  ) {}

  async findOrCreateProduct(item: {
    name: string;
    quantity: number;
  }) {
    let product = await this.prisma.product.findFirst({
      where: {
        name: {
          contains: item.name,
          mode: 'insensitive',
        },
      },
      include: {
        inventory: true,
      },
    });

    if (!product) {
      // Get brand and category from the enrichment engine
      const enriched = this.enrichmentService.enrich(item.name);

      // Create the product
      product = await this.prisma.product.create({
        data: {
          name: item.name,
          brand: enriched.brand,
          mrp: 0,
          sellingPrice: 0,

          category: {
            connectOrCreate: {
              where: {
                name: enriched.category,
              },
              create: {
                name: enriched.category,
              },
            },
          },
        },
        include: {
          inventory: true,
        },
      });

      // Create inventory for the new product
      await this.prisma.inventory.create({
        data: {
          productId: product.id,
          quantity: item.quantity,
        },
      });

      // Reload product with inventory
      product = await this.prisma.product.findUnique({
        where: {
          id: product.id,
        },
        include: {
          inventory: true,
        },
      });
    }

    return product;
  }
}