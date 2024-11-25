import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    ChatgptModule,ConfigModule.
    forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),
    UserModule,
  ],
})

export class AppModule {}
