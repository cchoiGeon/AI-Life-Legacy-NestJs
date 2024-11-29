import { Module } from '@nestjs/common';
import { ChatgptModule } from './api/chatgpt/chatgpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { typeORMConfig } from 'src/db/config/typeorm.config';
import { MyprofileModule } from './api/myprofile/myprofile.module';
import { PostModule } from './api/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    ChatgptModule,
    MyprofileModule,
    PostModule,
  ],
})

export class AppModule {}
