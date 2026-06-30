import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { KnowledgeService } from './knowledge.service';
import { QueryDto } from './dto/query.dto';

@ApiTags('Knowledge')
@Controller('knowledge')
export class KnowledgeController {
  constructor(
    private readonly knowledgeService: KnowledgeService,
  ) {}

  @Post()
  getKnowledge(@Body() body: QueryDto) {
    return this.knowledgeService.getKnowledge(body.query);
  }
}