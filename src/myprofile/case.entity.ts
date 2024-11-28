import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CaseList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    caseId: string;

    @Column()
    step: number;

    @Column()
    content: string;
}
