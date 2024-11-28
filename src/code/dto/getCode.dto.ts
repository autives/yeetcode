import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Language } from "../code.entity";

export class GetCodeDto {
    @IsNotEmpty()
    @IsNumber()
    ownerId: number;

    @IsOptional()
    @IsEnum(Language)
    language?: Language;
}
