import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OcrService } from '../ocr/ocr.service';
import { ParserService } from '../parser/parser.service';
import { ExtractorService } from '../extractor/extractor.service';
import { EventsService } from '../events/events.service';
import { MatcherService } from '../matcher/matcher.service';

type UpdatedProduct = {
  product: string;
  quantityAdded: number;
  status: string;
};

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ocrService: OcrService,
    private readonly parserService: ParserService,
    private readonly extractorService: ExtractorService,
    private readonly eventsService: EventsService,
    private readonly matcherService: MatcherService,

  ) {}

  async processInvoice() {
    const updatedProducts: UpdatedProduct[] = [];

    // OCR
    const ocr = await this.ocrService.scanInvoice();

    // Parse
    const parsed = this.parserService.parse(ocr.text);

    // Extract Products
    const extracted = this.extractorService.extract(ocr.text);

    // Update Inventory / Create Product
    for (const item of extracted) {
      const product = await this.matcherService.findOrCreateProduct(item);

      if (product) {
        // Product exists

        if (product.inventory) {
          await this.prisma.inventory.update({
            where: {
              productId: product.id,
            },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });
        } else {
          await this.prisma.inventory.create({
            data: {
              productId: product.id,
              quantity: item.quantity,
            },
          });
        }

        updatedProducts.push({
          product: product.name,
          quantityAdded: item.quantity,
          status: 'Updated',
        });
      } else {
        // Product doesn't exist -> Create it

        const newProduct = await this.prisma.product.create({
          data: {
            name: item.name,
            description: '',
            brand: '',
            mrp: 0,
            sellingPrice: 0,
            barcode: null,
          },
        });

        await this.prisma.inventory.create({
          data: {
            productId: newProduct.id,
            quantity: item.quantity,
          },
        });

        updatedProducts.push({
          product: newProduct.name,
          quantityAdded: item.quantity,
          status: 'Created',
        });
      }
    }

    await this.eventsService.publish('invoice.processed', {
  products: extracted,
  parsed,
  timestamp: new Date(),
});

    return {
      message: 'Invoice processed successfully',
      ocr,
      parsed,
      extracted,
      updatedProducts,
    };
  }
}