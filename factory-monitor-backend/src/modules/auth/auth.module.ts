import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IUserRepository } from '../user/domain/interfaces/user.repository.interface';
import { UserRepository } from '../user/infrastructure/repositories/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/domain/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_jwt_secret_here', // move to .env later
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
