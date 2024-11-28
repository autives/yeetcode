import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Code } from "../code/code.entity";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Index()
    @Column({ unique: true })
    username: string;

    @Column({ type: "bytea"})
    password: Buffer;

    @Column({ type: "bytea" })
    salt: Buffer;

    @OneToMany((type) => Code, (code) => code.owner)
    codes: Code[];
}
