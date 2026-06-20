import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        store: true,
      },
    });
  }
}