import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async recommend(productId: string) {
    return this.prisma.product.findMany({
      where: {
        NOT: {
          id: productId,
        },
      },
      take: 3,
      include: {
        inventory: true,
      },
    });
  }
}