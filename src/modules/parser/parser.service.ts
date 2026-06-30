import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  parse(text: string) {
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return {
      totalLines: lines.length,
      lines,
    };
  }
}