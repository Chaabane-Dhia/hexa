import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Model } from 'sequelize-typescript';

@Injectable()
export class UserRepository implements IUserRepository {
  
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userModel.findOne({ where: { id } });
  }

  async createUser(data: any): Promise<User> {
    return this.userModel.create(data);
  }

  async updateUser(id: string, data: any): Promise<User> {
    // Step 1: Find the user by ID
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Step 2: Update user properties directly
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;  // Update password or other fields

    // Step 3: Save the updated user instance
    await user.save();

    // Return the updated user
    return user;
  }
  

  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) await user.destroy();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();  
  }
}
