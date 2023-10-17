import { PartialType } from '@nestjs/mapped-types';
import { CreateToolsDto } from './create-tools.dto';

export class UpdateToolsDto extends PartialType(CreateToolsDto) {
  tool?: string;
}
