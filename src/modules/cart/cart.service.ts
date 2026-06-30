import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async addItem(
    userId: string,
    item: {
      productId: string;
      quantity: number;
    },
  ) {
    const existing =
      await this.prisma.cart.findFirst({
        where: {
          userId,
          productId:
            item.productId,
        },
      });

    if (existing) {
      return this.prisma.cart.update({
        where: {
          id: existing.id,
        },
        data: {
          quantity:
            existing.quantity +
            item.quantity,
        },
      });
    }

    return this.prisma.cart.create({
      data: {
        userId,
        productId:
          item.productId,
        quantity:
          item.quantity,
      },
    });
  }

  async getCart(userId: string) {
    return this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
  }

  async clearCart(userId: string) {
    await this.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });

    return {
      message: 'Cart cleared.',
    };
  }
}