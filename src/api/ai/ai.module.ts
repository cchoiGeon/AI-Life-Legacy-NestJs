import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AuthModule } from 'src/api/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
