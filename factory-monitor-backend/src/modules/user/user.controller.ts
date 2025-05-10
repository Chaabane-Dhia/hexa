import { Controller, Get, Post, Put, Delete, Body, Param,  } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return updatedUser;  // Return the updated user details
  }



  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);
    return response;  // Return success message and deleted user's id
  }

  @Get()  // To fetch all users
  async getAll() {
    return this.userService.getAllUsers();
  }

}
