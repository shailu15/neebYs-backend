import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        brand: createProductDto.brand,
        category: createProductDto.category,
        mrp: createProductDto.mrp,
        sellingPrice: createProductDto.sellingPrice,
        barcode: createProductDto.barcode,

        store: {
          connect: {
            id: createProductDto.storeId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        store: true,
      },
    });
  }
}