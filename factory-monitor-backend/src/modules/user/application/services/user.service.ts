import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository, IUserRepository as IUserRepositoryToken } from '../../domain/interfaces/user.repository.interface';
import { CreateUserDto, UpdateUserDto } from '../../DTOs/user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../DTOs/user-response.dto';;
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  private toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.userRepository.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
    return this.toResponse(user);
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toResponse(user) : null;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    if (!updatedUser) {throw new NotFoundException(`User with ID ${id} not found`);}
      return {
        id: updatedUser.id,  
        name: updatedUser.name,
        email: updatedUser.email,
      };
}

  async deleteUser(id: string): Promise<{ message: string; id: string }> {
    await this.userRepository.deleteUser(id);
    return { message: 'User deleted successfully', id };
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.toResponse);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
