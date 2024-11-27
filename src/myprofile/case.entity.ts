// CREATE TABLE cases (
//     id INT AUTO_INCREMENT PRIMARY KEY,          -- 고유 ID
//     case_id VARCHAR(10) NOT NULL,               -- case 구분 (예: 'case_1', 'case_2')
//     step INT NOT NULL,                          -- 단계 (1, 2, 3, ...)
//     description VARCHAR(255) NOT NULL          -- 단계에 대한 설명
// );

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
