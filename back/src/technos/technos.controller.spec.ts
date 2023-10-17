import { Test, TestingModule } from '@nestjs/testing';
import { TechnosController } from './technos.controller';

describe('TechnosController', () => {
  let controller: TechnosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnosController],
    }).compile();

    controller = module.get<TechnosController>(TechnosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
