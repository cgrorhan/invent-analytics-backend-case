import { IsNumber, IsString, ValidateNested } from "class-validator";
import { UserBooksDto } from "./userBooksDto";

export class GetUserDto {
    
    @IsNumber()
    id:number

    @IsString()
    name:string

    @ValidateNested()
    books: UserBooksDto
}