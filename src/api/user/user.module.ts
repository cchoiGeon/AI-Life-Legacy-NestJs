import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/api/auth/auth.module';
import { User } from '../../db/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyprofileModule } from 'src/api/myprofile/myprofile.module';

@Module({
  imports:[
    AuthModule,
    MyprofileModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
