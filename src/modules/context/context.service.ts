import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextService {
  private lastProduct: string | null = null;

  setLastProduct(product: string) {
    this.lastProduct = product;
  }

  getLastProduct() {
    return this.lastProduct;
  }

  clear() {
    this.lastProduct = null;
  }
}