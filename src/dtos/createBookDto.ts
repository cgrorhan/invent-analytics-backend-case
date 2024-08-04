import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {

    @IsString()
    name:string
}