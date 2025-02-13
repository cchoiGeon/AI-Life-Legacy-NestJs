import { Module } from '@nestjs/common';
import { ChatgptModule } from './api/chatgpt/chatgpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { typeORMConfig } from 'src/db/config/typeorm.config';
import { PostModule } from './api/post/post.module';
import { AppController } from './app.controller';
import { UserCaseModule } from './api/user-case/user-case.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    ChatgptModule,
    PostModule,
    UserCaseModule,
  ],
  controllers:[AppController],
})

export class AppModule {}
