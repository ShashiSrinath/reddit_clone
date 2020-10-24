import {IsDefined, IsEmail, IsString, Length,} from "class-validator";

export class RegisterLocalDto  {
    @IsString()
    @Length(3,30)
    username: string;

    @IsEmail()
    @Length(3,1000)
    email: string;

    @IsString()
    @Length(4,30)
    password: string;

    @IsString()
    @Length(4,30)
    password2: string;
}