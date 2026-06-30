import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async scanInvoice() {
    const result = await Tesseract.recognize(
      'uploads/invoice.jpg',
      'eng',
    );

    return {
      text: result.data.text,
    };
  }
}