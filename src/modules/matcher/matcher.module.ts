import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MatcherService } from './matcher.service';
import { EnrichmentModule } from '../enrichment/enrichment.module';

@Module({
  imports: [PrismaModule,   EnrichmentModule,
],
  providers: [MatcherService],
  exports: [MatcherService],
})
export class MatcherModule {}