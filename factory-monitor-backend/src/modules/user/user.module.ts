import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { MockUserRepository } from './infrastructure/repositories/mock-user.repository';
import { IUserRepository } from './domain/interfaces/user.repository.interface';
import { UserController } from './user.controller'; 

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository, // Providing the interface
      useClass: MockUserRepository, // Binding the interface to the concrete class
    },
  ],
  exports: [UserService],
})
export class UserModule {}
