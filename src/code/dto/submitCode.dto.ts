import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Language } from "../code.entity";

const MAX_CODE_LENGTH = 10000;

export class SubmitCodeDto {
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsEnum(Language)
    @IsNotEmpty()
    language: Language;

    @IsString()
    @IsNotEmpty()
    @MaxLength(MAX_CODE_LENGTH)
    code: string
}
