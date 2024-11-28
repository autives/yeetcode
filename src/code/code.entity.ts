import { Entity, Column, Index } from "typeorm";
import { UserOwnedEntity } from "../common/entities/userOwned.entity";

export enum Language{
    C = "C",
    CPP = "CPP",
    Python = "Python",
    JS = "JS",
}

@Entity('Code')
export class Code extends UserOwnedEntity {
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
}
