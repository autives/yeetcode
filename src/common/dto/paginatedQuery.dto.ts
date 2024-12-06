import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export const DEFAULT_PAGE_SIZE = 10;

export abstract class PaginatedQuery {
    @ApiProperty({description: "The page number to send back."})
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number;

    @ApiProperty({description: "The page size."})    
    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value, obj }) => {
	if (obj.page && !value) {
	    return DEFAULT_PAGE_SIZE;
	}
	return value;
    })
    pageSize?: number;
}
