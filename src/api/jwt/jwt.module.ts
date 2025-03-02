import { forwardRef, Module } from '@nestjs/common';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../db/entity/users.entity';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 기본 전략 설정
    NestJsJwtModule.register({
      secret: jwtConfig.access_token_secret,
      signOptions: {
        expiresIn: jwtConfig.access_token_expires_in,
      },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, JwtAuthGuard],
})
export class JwtModule {}
