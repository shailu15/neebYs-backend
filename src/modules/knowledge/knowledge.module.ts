import { Module } from '@nestjs/common';

import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { CommerceIntelligenceService } from './commerce-intelligence.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KnowledgeController],
  providers: [
    KnowledgeService,
    CommerceIntelligenceService,
  ],
})
export class KnowledgeModule {}