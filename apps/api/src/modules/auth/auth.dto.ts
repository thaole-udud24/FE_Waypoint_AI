import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'worker@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6, example: 'secret123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ required: false, example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false, default: 'vi' })
  @IsOptional()
  @IsString()
  preferredLang?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'worker@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'secret123' })
  @IsString()
  password!: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken!: string;
}

export class UpdateConsentDto {
  @ApiProperty({ example: 'ANONYMOUS_DATA' })
  @IsString()
  purpose!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  granted!: boolean;
}
