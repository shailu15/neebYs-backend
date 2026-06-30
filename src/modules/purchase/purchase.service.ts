import { Injectable } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { InventoryQueryService } from '../inventory-query/inventory-query.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly searchService: SearchService,
    private readonly inventoryQueryService: InventoryQueryService,
  ) {}

  async receive(message: string) {
    console.log('🛒 Purchase Message:', message);

    const keyword = message
      .toLowerCase()
      .replace('buy', '')
      .trim();

    console.log('🔑 Purchase Keyword:', keyword);

    const products = await this.searchService.search(keyword);

    if (products.length === 0) {
      return {
        status: 'Product not found',
      };
    }

    const product = products[0];

    const inventory =
      await this.inventoryQueryService.getProductInventory(product.id);


    return {
      status: 'Product Found',
      product,
      inventory,
    };
  }
}