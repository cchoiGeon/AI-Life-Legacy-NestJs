import { Module } from '@nestjs/common';
import { MyprofileController } from './myprofile.controller';
import { MyprofileService } from './myprofile.service';
import { AuthModule } from 'src/api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseList } from '../../db/entity/case.entity'

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CaseList])],
  controllers: [MyprofileController],
  providers: [MyprofileService],
  exports: [MyprofileService],
})
export class MyprofileModule {}
