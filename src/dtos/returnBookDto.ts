
import { IsNumber, Max, Min } from "class-validator";

export class ReturnBookDto {

    @IsNumber()
    @Max(10,{message:"Score can not more than 10"})
    @Min(1,{message:"Score can not less than 1"})
    score:number
}