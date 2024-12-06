import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { UserOwnedEntity } from "../common/entities/userOwned.entity";
import { Problem } from "../problem/problem.entity";

export enum Language{
    C = "C",
    CPP = "CPP",
    Python = "Python",
    JS = "JS",
}

@Entity('Code')
@Index(['ownerId', 'problemId', 'language'], {unique: true})
export class Submission extends UserOwnedEntity {
    @Index()
    @Column({
	type: "enum",
	enum: Language,
    })
    language: Language

    @Column({
	type: "text"
    })
    code: string;

    @Column({ nullable: false })
    problemId: number;

    @ManyToOne(() => Problem, (problem) => problem.submissions)
    @JoinColumn({ name: "problemId" })
    problem: Problem;
}
