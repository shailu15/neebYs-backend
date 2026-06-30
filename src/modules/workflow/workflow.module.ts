import { Module } from '@nestjs/common';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { WorkflowService } from './workflow.service';
import { OrdersModule } from '../orders/orders.module';
import { SearchModule } from '../search/search.module';
import { InventoryQueryModule } from '../inventory-query/inventory-query.module';
import { PurchaseModule } from '../purchase/purchase.module';
import { ContextModule } from '../context/context.module';
import { CartModule } from '../cart/cart.module';
import { RecentModule } from '../recent/recent.module';
import { FrequentlyBoughtModule } from '../frequently-bought/frequently-bought.module';
import { AddressModule } from '../address/address.module';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { StoreProductModule } from '../store-product/store-product.module';

@Module({
  imports: [
    SearchModule,
    InventoryQueryModule,
    PurchaseModule,
    ContextModule,
    CartModule,
    OrdersModule,
    RecommendationModule,
    RecentModule,
    FrequentlyBoughtModule,
    AddressModule,
    SessionModule,
    UsersModule,
    StoreProductModule,
  ],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}