import { Test, TestingModule } from '@nestjs/testing';
import { FrequentlyBoughtService } from './frequently-bought.service';

describe('FrequentlyBoughtService', () => {
  let service: FrequentlyBoughtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequentlyBoughtService],
    }).compile();

    service = module.get<FrequentlyBoughtService>(FrequentlyBoughtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
