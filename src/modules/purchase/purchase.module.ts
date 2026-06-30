import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { SearchModule } from '../search/search.module';
import { InventoryQueryModule } from '../inventory-query/inventory-query.module';

@Module({
  imports: [
    SearchModule,
    InventoryQueryModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],   // <-- important
})
export class PurchaseModule {}