import { ApiProperty } from "@nestjs/swagger";
import { ProblemTags } from "../problem.tags";
import { ProblemDifficulty } from "../problem.difficulty";

export class CreateProblemDto {
    @ApiProperty({ description: 'Problem title' })
    title: string;

    @ApiProperty({ description: 'Problem descritption' })
    description: string;

    @ApiProperty({ description: 'Problem tags', enum: ProblemTags, isArray: true })
    tags: ProblemTags[];

    @ApiProperty({ description: 'Problem difficulty', enum: ProblemDifficulty })
    difficulty: ProblemDifficulty;

    @ApiProperty({ description: 'Inputs cases to test against', isArray: true })
    testInputs: string[];

    @ApiProperty({ description: 'Expected outputs of the test cases', isArray: true })
    expectedOutputs: string[];

    @ApiProperty({ description: 'Boilerplate code provided to the user' })
    boilerplate: string;
}
