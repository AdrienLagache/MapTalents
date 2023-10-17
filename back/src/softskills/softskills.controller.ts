import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SoftSkillsService } from './softskills.service';
import { SoftSkill } from './entities/softskills.entity';
import { CreateSoftSkillsDto } from './dto/create-softkills.dto';
import { UpdateSoftSkillsDto } from './dto/update-softkills.dto';

@Controller('api/softSkills')
export class SoftSkillsController {
  constructor(private readonly softSkillsService: SoftSkillsService) {}

  @Get()
  findAll(): Promise<SoftSkill[]> {
    return this.softSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SoftSkill | null> {
    return this.softSkillsService.findOne(id);
  }

  @Get('name/:softSkill')
  findByName(@Param('softSkill') softSkill: string): Promise<SoftSkill | null> {
    return this.softSkillsService.findByName(softSkill);
  }

  @Post()
  create(@Body() newSoftSkill: CreateSoftSkillsDto): Promise<SoftSkill> {
    return this.softSkillsService.create(newSoftSkill);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() softSkill: UpdateSoftSkillsDto,
  ): Promise<SoftSkill> {
    return this.softSkillsService.update(id, softSkill);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedSoftSkills: number }> {
    return this.softSkillsService.remove(id);
  }
}
