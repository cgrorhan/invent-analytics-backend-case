import { IsDefined, IsNumber, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsNumberOrString } from "../utils/isNumberOrStringDecorator";

export class GetBookDto {

    @IsNumber()
    id:number

    @IsString()
    name:string

    @IsDefined()
    @Validate(IsNumberOrString)
    score: string | number
}

