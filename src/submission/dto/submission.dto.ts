import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Language } from "../submission.entity";
import { ApiProperty } from "@nestjs/swagger";

export const MAX_CODE_LENGTH = 10000;

export class SubmissionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'id of the code owner' })
    ownerId: string;

    @IsEnum(Language)
    @IsNotEmpty()
    @ApiProperty({ description: 'Language of the code', enum: Language })    
    language: Language;

    @IsString()
    @IsNotEmpty()
    @MaxLength(MAX_CODE_LENGTH)
    @ApiProperty({ description: 'Solution code', maxLength: MAX_CODE_LENGTH })
    code: string
}
