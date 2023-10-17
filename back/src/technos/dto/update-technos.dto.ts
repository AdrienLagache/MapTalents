import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnosDto } from './create-technos.dto';

export class UpdateTechnosDto extends PartialType(CreateTechnosDto) {
  id?: number;
  techno?: string;
  logo?: string;
}
