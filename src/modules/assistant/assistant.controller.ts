import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AssistantService } from './assistant.service';
import { AssistantDto } from './dto/assistant.dto';

@ApiTags('Assistant')
@Controller('assistant')
export class AssistantController {
  constructor(
    private readonly assistantService: AssistantService,
  ) {}

  @Post()
  async ask(@Body() body: AssistantDto) {
    return this.assistantService.ask(body.query);
  }
}