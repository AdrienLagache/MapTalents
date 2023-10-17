import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { NotFoundException } from '@nestjs/common';
import { encodePassword } from 'utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findOneByMail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { mail: email } });
  }
  async remove(id: number): Promise<{ deletedUsers: number }> {
    const userToDelete = await this.usersRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(userToDelete);

    const deletedUsers = 1;

    return { deletedUsers };
  }

  async create(user: CreateUsersDto): Promise<User> {
    const password = encodePassword(user.password);
    const imageUrl = user.image ? user.image : process.env.NOBODY_URL;
    const newUser = this.usersRepository.create({
      ...user,
      password,
      image: imageUrl,
    });
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: UpdateUsersDto): Promise<User> {
    const userToUpdate = await this.usersRepository.findOneByOrFail({ id });

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    Object.assign(userToUpdate, user);

    return this.usersRepository.save(userToUpdate);
  }

  async updateUserPassword(id: number, newPassword: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = encodePassword(newPassword);
    user.password = hashedPassword;

    return this.usersRepository.save(user);
  }
}
