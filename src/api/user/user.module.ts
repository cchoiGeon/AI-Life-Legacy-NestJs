import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/api/auth/auth.module';
import { Users } from '../../db/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCaseModule } from '../user-case/user-case.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    forwardRef(()=>AuthModule),
    UserCaseModule,
  ],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports: [UserService,UserRepository],
})
export class UserModule {}
