import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {

      console.log("DTO:", createOrderDto);
  console.log("Searching Product ID:", createOrderDto.productId);

  const inventory = await this.prisma.inventory.findFirst({
    where: {
      productId: createOrderDto.productId,
    },
  });

  if (!inventory) {
    throw new Error('Product not found in inventory');
  }

  await this.prisma.inventory.update({
  where: {
    productId: createOrderDto.productId,
  },
  data: {
    quantity: inventory.quantity - 1,
  },
});

  return this.prisma.order.create({
    data: createOrderDto,
  });
}

  findAll() {
    return this.prisma.order.findMany();
  }
}