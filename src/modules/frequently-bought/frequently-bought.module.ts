import { Module } from '@nestjs/common';
import { FrequentlyBoughtService } from './frequently-bought.service';

@Module({
  providers: [FrequentlyBoughtService],
  exports: [FrequentlyBoughtService],
})
export class FrequentlyBoughtModule {}