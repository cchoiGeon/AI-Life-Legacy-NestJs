import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Posts } from "./posts.entity";
import { UserCase } from "./user-case.entity";

@Entity('users')
export class Users extends BaseEntity {
    
    @PrimaryColumn()
    uuid: string = uuid();
    
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true})
    password: string;

    @OneToMany(() => Posts, (posts) => posts.user) 
    posts: Posts;

    @OneToOne(() => UserCase)
    @JoinColumn({ name: 'user_case' })
    userCase: UserCase;
}
