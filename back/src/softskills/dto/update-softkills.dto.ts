import { PartialType } from '@nestjs/mapped-types';
import { CreateSoftSkillsDto } from './create-softkills.dto';

export class UpdateSoftSkillsDto extends PartialType(CreateSoftSkillsDto) {
  softSkill?: string;
}
