import { Test, TestingModule } from '@nestjs/testing';
import { DevsController } from './devs.controller';

describe('DevsController', () => {
  let controller: DevsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevsController],
    }).compile();

    controller = module.get<DevsController>(DevsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
