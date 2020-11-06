import {IsInt, IsOptional, IsString, Length} from "class-validator";

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

export class UpdateGroupDto {

    @IsInt()
    id: number

    @IsOptional()
    @IsString()
    @Length(3,255)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(3,1000)
    description?: string;
}
