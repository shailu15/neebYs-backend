import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ) {
    console.log(
      'DTO:',
      createOrderDto,
    );

    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async findByCustomer(
    customer: string,
  ) {
    return this.prisma.order.findMany({
      where: {
        customer,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async cancel(id: string) {
    const order =
      await this.prisma.order.findUnique({
        where: {
          id,
        },
      });

    if (!order) {
      throw new Error(
        'Order not found',
      );
    }

    return this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status:
          'CANCELLED',
      },
    });
  }


  async reduceInventory(
    productId: string,
    quantity: number,
  ) {
    const inventory =
      await this.prisma.inventory.findFirst(
        {
          where: {
            productId,
          },
        },
      );

    // MVP:
    // If inventory doesn't exist,
    // don't crash ordering.
    if (!inventory) {
      return;
    }

    if (
      inventory.quantity <
      quantity
    ) {
      throw new Error(
        'Insufficient stock.',
      );
    }

    return this.prisma.inventory.update(
      {
        where: {
          productId,
        },
        data: {
          quantity:
            inventory.quantity -
            quantity,
        },
      },
    );
  }

  //
  async reduceProductStock(
  productId: string,
  quantity: number,
) {
  return this.prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });
}

  async restoreInventory(
    productId: string,
    quantity: number,
  ) {
    const inventory =
      await this.prisma.inventory.findFirst(
        {
          where: {
            productId,
          },
        },
      );

    // MVP:
    // No inventory row,
    // nothing to restore.
    if (!inventory) {
      return;
    }

    return this.prisma.inventory.update(
      {
        where: {
          productId,
        },
        data: {
          quantity:
            inventory.quantity +
            quantity,
        },
      },
    );
  }

  //update status
  updateStatus(
  id: string,
  status: string,
) {
  return this.prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

  async findAll() {
    const orders =
      await this.prisma.order.findMany();

    console.log(
      '📦 Orders:',
      orders,
    );

    return orders;
  }
}