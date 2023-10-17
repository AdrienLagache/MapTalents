import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  //UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
//import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedUsers: number }> {
    return this.usersService.remove(id);
  }

  @Post()
  create(@Body() newUser: CreateUsersDto): Promise<User> {
    return this.usersService.create(newUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() userToUpdate: UpdateUsersDto,
  ): Promise<User> {
    return this.usersService.update(id, userToUpdate);
  }

  @Patch(':id/update-password')
  async updateUserPassword(
    @Param('id') id: number,
    @Body() updatePassword: { newPassword: string },
  ): Promise<User> {
    console.log(id);
    console.log(updatePassword);
    return this.usersService.updateUserPassword(id, updatePassword.newPassword);
  }
}
