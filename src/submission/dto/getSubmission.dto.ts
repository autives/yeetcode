import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Language } from "../submission.entity";

export class GetSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    ownerId: number;

    @IsOptional()
    @IsEnum(Language)
    language?: Language;
}
