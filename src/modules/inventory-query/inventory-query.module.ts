import { Module } from '@nestjs/common';

import { InventoryQueryService } from './inventory-query.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InventoryQueryService],
  exports: [InventoryQueryService],
})
export class InventoryQueryModule {}