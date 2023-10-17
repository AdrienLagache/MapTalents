import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsController } from './softskills.controller';

describe('SoftskillsController', () => {
  let controller: SoftSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftSkillsController],
    }).compile();

    controller = module.get<SoftSkillsController>(SoftSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
