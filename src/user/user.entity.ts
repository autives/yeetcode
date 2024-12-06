import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { Submission } from "../submission/submission.entity";

@Entity('User')
export class User {
    @PrimaryColumn() 
    id: string;

    @Column()
    name: string;

    @Index()
    @Column({ unique: true })
    username: string;

    @OneToMany((type) => Submission, (sumbission) => sumbission.owner)
    submissions: Submission[];
}
