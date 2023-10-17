import { Module } from '@nestjs/common';
import { SoftSkillsController } from './softskills.controller';
import { SoftSkillsService } from './softskills.service';
import { SoftSkill } from './entities/softskills.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SoftSkill])],
  controllers: [SoftSkillsController],
  providers: [SoftSkillsService],
})
export class SoftSkillsModule {}
