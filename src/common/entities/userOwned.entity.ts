import { Column, CreateDateColumn, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "../../user/user.entity";

export abstract class UserOwnedEntity extends BaseEntity {
    @Index()
    @Column({ nullable: false })
    ownerId: number;
    
    @ManyToOne(() => User, (user) => user.codes, { nullable: false, eager: true })
    @JoinColumn({ name: "ownerId" })
    owner: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}