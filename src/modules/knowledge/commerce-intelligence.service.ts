import { Injectable } from '@nestjs/common';

@Injectable()
export class CommerceIntelligenceService {
  generateSummary(summary: {
    totalProducts: number;
    totalStock: number;
    lowestPrice: number;
    highestPrice: number;
    storesFound: number;
  }): string {
    if (summary.totalProducts === 0) {
      return 'No matching products were found.';
    }

    return `
Found ${summary.totalProducts} matching product(s).

Lowest Price : ₹${summary.lowestPrice}

Highest Price : ₹${summary.highestPrice}

Total Stock : ${summary.totalStock}

Available in ${summary.storesFound} store(s).
`;
  }
}