import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParserService } from './parser.service';
import { ParseTextDto } from './dto/parse-text.dto';

@ApiTags('Parser')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  parse(@Body() body: ParseTextDto) {
    return this.parserService.parse(body.text);
  }
}