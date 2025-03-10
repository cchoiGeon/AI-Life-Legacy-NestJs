import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule, RedisCacheModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService], // 서비스와 전략 제공
  exports: [AuthService], // 외부에서 사용 가능하도록 export
})
export class AuthModule {}
