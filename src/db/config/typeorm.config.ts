import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../entity/user.entity"
import * as config from 'config';
import { CaseList } from "../entity/case.entity"
import { Posts } from "../entity/posts.entitiy";

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User,CaseList,Posts],
    synchronize: true,
}