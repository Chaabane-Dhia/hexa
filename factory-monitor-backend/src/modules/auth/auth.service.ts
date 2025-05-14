import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../user/domain/interfaces/user.repository.interface';
import { Inject } from '@nestjs/common';
import { SignupDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { name, email, password } = signupDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ name, email, password: hashedPassword });

    if (!user) {
      throw new Error('User creation failed');
    }
    
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { id: user.id, name: user.name, email: user.email, token};
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
  const user = await this.userRepository.findByEmail(dto.email);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(dto.password, user.password);
  if (!passwordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const token = this.jwtService.sign({
    sub: user.id,
    email: user.email,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}
}
