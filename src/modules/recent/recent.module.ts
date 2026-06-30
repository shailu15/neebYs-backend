import { Module } from '@nestjs/common';
import { RecentService } from './recent.service';

@Module({
  providers: [RecentService],
  exports: [RecentService],
})
export class RecentModule {}