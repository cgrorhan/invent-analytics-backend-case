import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3, {message:"Name has to be 3 character at least."})
    @MaxLength(255, {message:"Name can not be longer than 255 character."})
    name:string
}