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
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}
}
