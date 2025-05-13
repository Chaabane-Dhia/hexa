// src/modules/auth/services/auth.service.ts

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user/domain/interfaces/user.repository.interface';
import { Inject } from '@nestjs/common';
import { SignupDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/DTOs/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<UserResponseDto> {
    const { name, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ name, email, password: hashedPassword });

    return { id: user.id, name: user.name, email: user.email };
  }

  async login(loginDto: LoginDto): Promise<string | null> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordMatch) return null;

    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
