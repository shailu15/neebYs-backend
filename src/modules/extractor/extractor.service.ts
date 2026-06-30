import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtractorService {
  extract(text: string) {
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

      const products: {
  name: string;
  quantity: number;
  price: number | null;
}[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (
        line.toLowerCase().includes('amul') ||
        line.toLowerCase().includes('milk')
      ) {
        products.push({
          name: line,
          quantity: 1,
          price: null,
        });
      }
    }

    return products;
  }
}