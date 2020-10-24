import {IsDefined, IsString, Length} from "class-validator";

export class ChangePasswordDto {

    @IsString()
    @Length(0,100)
    oldPassword: string;

    @Length(4,30)
    password: string;

    @Length(4,30)
    password2: string;
}