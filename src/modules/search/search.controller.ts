import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @ApiBody({ type: SearchDto })
  search(@Body() body: SearchDto) {
    return this.searchService.search(body.query);
  }
}