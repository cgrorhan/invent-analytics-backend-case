import { IsArray, IsNumber, IsString } from "class-validator";

export class UserBooksDto {
    
    @IsArray()
    past:PastBorrowedBookDto[]

    @IsArray()
    present: PresentBorrowedBookDto[]
}

class PastBorrowedBookDto {

    @IsString()
    name:string

    @IsNumber()
    score:number
}

class PresentBorrowedBookDto {

    @IsString()
    name:string
}