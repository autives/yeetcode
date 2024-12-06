import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProblemTags } from "./problem.tags";
import { ProblemDifficulty } from "./problem.difficulty";
import { Submission } from "../submission/submission.entity";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column("simple-array")
    tags: ProblemTags[];

    @Column()
    difficulty: ProblemDifficulty;

    @Column("simple-array")
    testInputs: string[]

    @Column("simple-array")
    expectedOutputs: string[]

    @Column()
    boilerplate: string;

    @OneToMany((type) => Submission, (submission) => submission.problem)
    submissions: Submission[];
}
