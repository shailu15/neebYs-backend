import { Injectable } from '@nestjs/common';

@Injectable()
export class FrequentlyBoughtService {
  get(productName: string): string[] {
    const map: Record<string, string[]> = {
      'Amul Taaza Milk': [
        'Amul Butter',
        'Britannia Brown Bread',
        'Farm Fresh Eggs',
      ],

      'Britannia Brown Bread': [
        'Amul Butter',
        'Farm Fresh Eggs',
        'Amul Taaza Milk',
      ],

      'Amul Butter': [
        'Amul Taaza Milk',
        'Britannia Brown Bread',
      ],
    };

    return map[productName] || [];
  }
}