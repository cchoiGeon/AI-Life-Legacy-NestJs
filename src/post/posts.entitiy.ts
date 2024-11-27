import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    mainId: number;

    @Column()
    subId: number;

    @Column()
    data: string;

    @Column()
    question: string;
}
