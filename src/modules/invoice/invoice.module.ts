import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

import { PrismaModule } from '../../prisma/prisma.module';
import { OcrModule } from '../ocr/ocr.module';
import { ParserModule } from '../parser/parser.module';
import { ExtractorModule } from '../extractor/extractor.module';
import { EventsModule } from '../events/events.module';
import { MatcherModule } from '../matcher/matcher.module';


@Module({
  imports: [
    PrismaModule,
    OcrModule,
    ParserModule,
    ExtractorModule,
    EventsModule,
    MatcherModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService], // 👈 Required
})
export class InvoiceModule {}