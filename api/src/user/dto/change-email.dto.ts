import {IsDefined, IsEmail, IsString, Length} from "class-validator";

export class ChangeEmailDto {
    @IsString()
    @Length(0,100)
    password: string

    @IsEmail()
    @Length(3,1000)
    email: string;
}