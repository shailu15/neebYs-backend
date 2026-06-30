import { Test, TestingModule } from '@nestjs/testing';
import { RecentService } from './recent.service';

describe('RecentService', () => {
  let service: RecentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecentService],
    }).compile();

    service = module.get<RecentService>(RecentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
