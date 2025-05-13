// src/modules/auth/controllers/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { UserResponseDto } from '../user/DTOs/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<UserResponseDto> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const token = await this.authService.login(loginDto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { access_token: token };
  }
}
