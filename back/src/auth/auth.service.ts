import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, pass: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { mail: mail } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      delete result.password;
      console.log('User Validation Success!');
      return result;
    }
    console.log('User Validation Failed');
    return undefined;
  }
  async login(user: any) {
    // console.log(user.user);
    const payload = {
      user: {
        id: user.user.id,
        mail: user.user.mail,
        firstname: user.user.firstname,
        lastname: user.user.lastname,
        role: user.user.role_name,
        created_at: user.user.created_at,
        updated_at: user.user.updated_at,
        image: user.user.image,
      },
    };
    console.log({ payload });
    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }

  async register(data) {
    const response = await this.usersService.create(data);
    if (response) {
      const { ...result } = response;
      delete result.password;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
