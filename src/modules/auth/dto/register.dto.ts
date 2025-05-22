// src/auth/dto/register.dto.ts
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthRoleEnum } from 'src/common/enums/auth-role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(AuthRoleEnum)
  role: AuthRoleEnum;
}
