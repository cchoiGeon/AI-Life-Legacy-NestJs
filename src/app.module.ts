import { Module } from '@nestjs/common';
import { AiModule } from './api/ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { typeORMConfig } from 'src/db/config/typeorm.config';
import { PostModule } from './api/post/post.module';
import { AppController } from './app.controller';
import { UserCaseModule } from './api/user-case/user-case.module';
import { ContentModule } from './api/content/content.module';
import { JwtModule } from './api/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    JwtModule,
    AuthModule,
    UserModule,
    AiModule,
    PostModule,
    UserCaseModule,
    ContentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
