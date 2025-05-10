import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserRepository as IUserRepositoryToken } from '../../domain/interfaces/user.repository.interface';
import { CreateUserDto, UpdateUserDto } from '../../user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../user-response.dto';
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
  

  async createUser(createUserDto: CreateUserDto): Promise<{ id: string; name: string; email: string }> {
    const user = await this.userRepository.createUser(createUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  

  async getUserById(id: string): Promise<{ id: string; name: string; email: string } | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
  
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    console.log('Updated User (Service):', updatedUser);  // Log the updated user to check if id is included

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
  
  
  
  

  async deleteUser(id: string): Promise<{ message: string, id: string }> {
    await this.userRepository.deleteUser(id);
    return { message: 'User deleted successfully', id };  // Return success message and deleted user's id
  }


  async getAllUsers(): Promise<{ id: string; name: string; email: string }[]> {
    const users = await this.userRepository.findAll();  // Assuming this method is available in your repository
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
  
  
}
