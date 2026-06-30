import { Module } from '@nestjs/common';
import { EnrichmentService } from './enrichment.service';
import { EnrichmentController } from './enrichment.controller';

@Module({
  providers: [EnrichmentService],
  controllers: [EnrichmentController],
  exports: [EnrichmentService],
})
export class EnrichmentModule {}