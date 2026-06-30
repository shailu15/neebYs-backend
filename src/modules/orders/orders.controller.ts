import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id/status')
updateStatus(
  @Param('id') id: string,
  @Body('status')
  status: string,
) {
  return this.ordersService.updateStatus(
    id,
    status,
  );
}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}