import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesDto } from './create-categories.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {
  id?: number;
  category?: string;
}
