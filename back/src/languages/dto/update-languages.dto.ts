import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguagesDto } from './create-languages.dto';

export class UpdateLanguagesDto extends PartialType(CreateLanguagesDto) {
  id?: number;
  language?: string;
}
