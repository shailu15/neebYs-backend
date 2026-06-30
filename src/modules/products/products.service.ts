import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(
  createProductDto: CreateProductDto,
) {
  return this.prisma.product.create({
    data: {
      name:
        createProductDto.name,

      description:
        createProductDto.description,

      brand:
        createProductDto.brand,

      mrp:
        createProductDto.mrp,

      sellingPrice:
        createProductDto.sellingPrice,

      barcode:
        createProductDto.barcode,

      storeId:
        createProductDto.storeId,

      categoryId:
        createProductDto.categoryId,
    },
  });
}


// update
update(
  id: string,
  data: any,
) {
  return this.prisma.product.update({
    where: {
      id,
    },
    data,
  });
}


  findAll() {
  return this.prisma.product.findMany({
    include: {
      store: true,
      inventory: true,
    },
  });
}

  findOne(id: string) {
  return this.prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      store: true,
      inventory: true,
      category: true,
      orders: true,
    },
  });
}

  async findByBarcode(barcode: string) {
  return this.prisma.product.findUnique({
    where: {
      barcode,
    },
    include: {
      inventory: true,
      store: true,
      category: true,
    },
  });
}
}