import { Test, TestingModule } from '@nestjs/testing';
import { TechnosService } from './technos.service';

describe('TechnosService', () => {
  let service: TechnosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnosService],
    }).compile();

    service = module.get<TechnosService>(TechnosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
