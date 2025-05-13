import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  createUser(data: any): Promise<User>;
  updateUser(id: string, data: any): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
}
export const IUserRepository = Symbol('IUserRepository');
