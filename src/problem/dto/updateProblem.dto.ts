import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProblemDto } from "./createProblem.dto";

export class UpdateProblemDto extends PartialType(CreateProblemDto){
    @ApiProperty({ description: 'The id of the problem to update' })
    id: number
}
