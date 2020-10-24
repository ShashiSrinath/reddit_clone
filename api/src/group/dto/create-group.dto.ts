import {IsString, Length} from "class-validator";

export class CreateGroupDto {

    @IsString()
    @Length(3,20)
    name: string;

    @IsString()
    @Length(3,255)
    title: string;

    @IsString()
    @Length(3,1000)
    description: string;
}