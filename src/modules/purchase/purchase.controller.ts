import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
  ) {}

  @Post()
  receive(@Body() body: PurchaseDto) {
    return this.purchaseService.receive(body.message);
  }
}