import { Body, Controller, Get, Post, Param  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get(':id/dashboard')
dashboard(@Param('id') id: string) {
  return this.storesService.dashboard(id);
}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }
}