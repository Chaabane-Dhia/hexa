import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async createUser(data: any): Promise<User> {
    const newUser = new User();
    newUser.id = uuidv4();
    newUser.name = data.name;
    newUser.email = data.email;
    newUser.password = data.password;
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, data: any): Promise<User> {
  const index = this.users.findIndex(user => user.id === id);
  if (index === -1) throw new Error('User not found');

  // Update user in memory
  const updatedUser = { ...this.users[index], ...data };
  this.users[index] = updatedUser;

  // Return the entire updated user object
  return updatedUser as User;
}


  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  async findAll(): Promise<User[]> {
    return this.users;  // Returning all users in the mock repository
  }
  
}
