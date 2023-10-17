import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(rawPassword, salt);
  return hashedPassword;
}
