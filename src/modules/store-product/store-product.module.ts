import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { StoreProductController } from './store-product.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StoreProductController],
  providers: [StoreProductService],
  exports: [StoreProductService],
})
export class StoreProductModule {}