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
      provide: IUserRepository, 
      useClass: MockUserRepository, 
    },
  ],
  exports: [
    UserService,
    {
      provide: IUserRepository,
      useClass: MockUserRepository,
    },
  ],
})
export class UserModule {}
