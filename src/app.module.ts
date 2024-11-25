import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ChatgptModule,ConfigModule.forRoot({isGlobal:true})],
})

export class AppModule {}
