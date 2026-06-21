import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  create(createInventoryDto: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: createInventoryDto,
    });
  }

  findAll() {
    return this.prisma.inventory.findMany();
  }
}