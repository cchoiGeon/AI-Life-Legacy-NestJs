import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import * as config from 'config';
import { CaseList } from "src/myprofile/case.entity";

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User,CaseList],
    synchronize: true,
}