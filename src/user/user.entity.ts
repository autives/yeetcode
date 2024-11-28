import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "bytea"})
    password: Buffer;

    @Column({ type: "bytea" })
    salt: Buffer;
}
