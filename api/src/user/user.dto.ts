import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class ChangeEmailDto {
  @IsString()
  @Length(0, 100)
  password: string;

  @IsEmail()
  @Length(3, 1000)
  email: string;
}

export class ChangePasswordDto {
  @IsString()
  @Length(0, 100)
  oldPassword: string;

  @Length(4, 30)
  password: string;

  @Length(4, 30)
  password2: string;
}

export class RegisterLocalDto {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsEmail()
  @Length(3, 1000)
  email: string;

  @IsString()
  @Length(4, 30)
  password: string;

  @IsString()
  @Length(4, 30)
  password2: string;
}

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsEmail()
  @Length(3, 1000)
  email: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  karma: number;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  emailVerified: boolean;
}

export class CheckUserNameDto {
  @IsString()
  @Length(3, 30)
  username: string;
}
