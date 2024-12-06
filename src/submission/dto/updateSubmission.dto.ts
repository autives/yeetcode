import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Language } from "../submission.entity";
import { ApiProperty } from "@nestjs/swagger";
import { MAX_CODE_LENGTH } from "./submission.dto";

export class UpdateSubmissionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'id of the submission to update' })
    id: number;

    @IsEnum(Language)
    @IsNotEmpty()
    @ApiProperty({ description: 'Change language', enum: Language })    
    language?: Language;

    @IsString()
    @IsNotEmpty()
    @MaxLength(MAX_CODE_LENGTH)
    @ApiProperty({ description: 'Solution code', maxLength: MAX_CODE_LENGTH })
    code?: string
}
