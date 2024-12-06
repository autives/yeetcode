import { ApiProperty } from "@nestjs/swagger";
import { ProblemDifficulty } from "../problem.difficulty";
import { ProblemTags } from "../problem.tags";
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { PaginatedQuery } from "../../common/dto/paginatedQuery.dto";

export enum TagConnective {
    AND = 'AND',
    OR = 'OR',
}

export class AdvancedSearchDto extends PaginatedQuery {
    @ApiProperty({ description: 'Tags to search for', isArray: true, enum: ProblemTags, required: false })
    @IsOptional()
    @IsEnum(ProblemTags)
    @IsArray()
    tags?: ProblemTags[];

    @ApiProperty({ description: 'Connective for the tags', enum: TagConnective, required: false })
    @IsOptional()
    @IsEnum(TagConnective)
    tagConnective?: TagConnective;

    @ApiProperty({ description: 'Difficulty levels to search for', isArray: true, enum: ProblemDifficulty, required: false })
    @IsOptional()
    @IsEnum(ProblemDifficulty)
    difficulty?: ProblemDifficulty[]

    @ApiProperty({ description: 'Search text to look for', required: false })
    @IsOptional()
    @IsString()
    searchText?: string;

    @ApiProperty({ description: 'Also apply search in problem description', required: false })
    @IsOptional()
    @IsBoolean()
    searchinBody?: boolean;

    @ApiProperty({ description: 'Search only the problems solved by user', required: false })
    @IsOptional()
    @IsBoolean()
    solved?: boolean;

    @ApiProperty({ description: 'User performing the request. Automatically inserted from the request' })
    @IsOptional()
    @IsString()
    userId: string;

}
