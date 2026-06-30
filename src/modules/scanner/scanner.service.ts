import { Injectable } from '@nestjs/common';

@Injectable()
export class ScannerService {
  parse(text: string) {
    return {
      rawText: text,
      message: 'Scanner module working 🚀',
    };
  }
}