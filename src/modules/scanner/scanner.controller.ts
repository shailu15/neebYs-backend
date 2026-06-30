import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScannerService } from './scanner.service';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('Scanner')
@Controller('scanner')
export class ScannerController {
  constructor(private readonly scannerService: ScannerService) {}

  @Post('parse')
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        example: 'Amul Taaza Milk 500ml ₹28',
      },
    },
  },
})
@Post('parse')
parse(@Body() body: { text: string }) {
    return this.scannerService.parse(body.text);
  }
}