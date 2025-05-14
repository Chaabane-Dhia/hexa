import { IsString, IsUUID } from 'class-validator';

export class AuthResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  token: string; 
}
