import { Test, TestingModule } from '@nestjs/testing';
import { InventoryQueryService } from './inventory-query.service';

describe('InventoryQueryService', () => {
  let service: InventoryQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryQueryService],
    }).compile();

    service = module.get<InventoryQueryService>(InventoryQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
