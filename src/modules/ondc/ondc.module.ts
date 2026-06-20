import { Module } from '@nestjs/common';
import { OndcService } from './ondc.service';

@Module({
  providers: [OndcService]
})
export class OndcModule {}
