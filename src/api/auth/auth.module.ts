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
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
