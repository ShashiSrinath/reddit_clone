import {IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, Length, Min} from "class-validator";
import {UserRole} from '@prisma/client';

export class UpdateUserDto {

    @IsInt()
    id: number;

    @IsOptional()
    @IsEmail()
    @Length(3,1000)
    email: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    karma: number

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole

    @IsOptional()
    @IsBoolean()
    emailVerified: boolean
}