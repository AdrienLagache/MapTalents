import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  id?: number;
  mail?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  image?: string;
  role_name?: string;
  created_at?: Date;
  updated_at?: Date;
}
