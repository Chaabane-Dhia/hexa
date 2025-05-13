import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
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
    const user = await this.userModel.findByPk(id);
      if (!user) {throw new NotFoundException(`User with ID ${id} not found`);}
      if (data.name) user.name = data.name;
      if ( data.email) user.email = data.email;
      if (data.password) user.password = data.password;
      await user.save();
      return user;
  }


  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) await user.destroy();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
