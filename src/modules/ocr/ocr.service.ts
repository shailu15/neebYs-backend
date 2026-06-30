import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrService {
  async scanInvoice() {
    return {
      text: 'OCR is temporarily disabled',
    };
  }
}