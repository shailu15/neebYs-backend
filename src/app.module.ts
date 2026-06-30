import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './modules/ai/ai.module';
import { OndcModule } from './modules/ondc/ondc.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { StoresModule } from './modules/stores/stores.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SearchModule } from './modules/search/search.module';
import { UploadModule } from './modules/upload/upload.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { ScannerModule } from './modules/scanner/scanner.module';
import { ParserModule } from './modules/parser/parser.module';
import { ExtractorModule } from './modules/extractor/extractor.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { AssistantModule } from './modules/assistant/assistant.module';
import { ChatModule } from './modules/chat/chat.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { EventsModule } from './modules/events/events.module';
import { MatcherService } from './modules/matcher/matcher.service';
import { EnrichmentModule } from './modules/enrichment/enrichment.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { InventoryQueryService } from './modules/inventory-query/inventory-query.service';
import { InventoryQueryModule } from './modules/inventory-query/inventory-query.module';
import { FormatterService } from './modules/formatter/formatter.service';
import { FormatterModule } from './modules/formatter/formatter.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { CartModule } from './modules/cart/cart.module';
import { RecentService } from './modules/recent/recent.service';
import { RecentModule } from './modules/recent/recent.module';
import { FrequentlyBoughtService } from './modules/frequently-bought/frequently-bought.service';
import { FrequentlyBoughtModule } from './modules/frequently-bought/frequently-bought.module';
import { AddressModule } from './modules/address/address.module';
import { SessionModule } from './modules/session/session.module';
import { StoreProductModule } from './modules/store-product/store-product.module';
@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule,
  UsersModule,
  AiModule,
  OndcModule,
  AuthModule,
  ProductsModule,
  StoresModule,
  CategoriesModule,
  OrdersModule,
  InventoryModule,
  SearchModule,
  UploadModule,
  OcrModule,
  ScannerModule,
  ParserModule,
  ExtractorModule,
  InvoiceModule,
  AssistantModule,
  ChatModule,
  KnowledgeModule,
  RecommendationModule,
  EventsModule,
  EnrichmentModule,
  WorkflowModule,
  InventoryQueryModule,
  FormatterModule,
  PurchaseModule,
  CartModule,
  RecentModule,
  FrequentlyBoughtModule,
  AddressModule,
  SessionModule,
  StoreProductModule,
],
  controllers: [AppController],
  providers: [AppService, MatcherService, InventoryQueryService, FormatterService, RecentService, FrequentlyBoughtService],
})
export class AppModule {}
