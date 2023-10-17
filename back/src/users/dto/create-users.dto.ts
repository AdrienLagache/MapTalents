export class CreateUsersDto {
  readonly id: number;
  readonly mail: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly image: string;
  readonly role_name: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
