import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrichmentService {
  enrich(name: string) {
    const lower = name.toLowerCase();

    let category = 'General';
    let brand = 'Unknown';

    if (lower.includes('amul')) {
      brand = 'Amul';
      category = 'Dairy';
    }

    if (lower.includes('coca') || lower.includes('pepsi')) {
      category = 'Soft Drinks';
    }

    if (lower.includes('rice')) {
      category = 'Rice';
    }

    if (lower.includes('atta')) {
      category = 'Flour';
    }

    if (lower.includes('oil')) {
      category = 'Cooking Oil';
    }

    return {
      brand,
      category,
    };
  }
}