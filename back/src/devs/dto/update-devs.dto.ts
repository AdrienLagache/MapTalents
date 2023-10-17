import { PartialType } from '@nestjs/mapped-types';
import { CreateDevsDto } from './create-devs.dto';

export class UpdateDevsDto extends PartialType(CreateDevsDto) {
  id?: number;
  title?: string;
  description?: string;
  address?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  adr?: number;
  experience?: Date;
  longitude?: number;
  latitude?: number;
  activity_area?: number;
  availability?: string;
  remote?: string;
  favorite_techno?: string;
  userId?: number;
  categoryId?: number;
  technoId?: Array<number>;
  languageId?: Array<number>;
  softSkillId?: Array<number>;
  toolId?: Array<number>;
}
