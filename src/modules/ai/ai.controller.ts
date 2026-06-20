import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SearchDto } from './dto/search.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  @Post('search')
  search(@Body() body: SearchDto) {
    return {
      query: body.query,
      message: 'AI Search Working 🚀',
    };
  }
}