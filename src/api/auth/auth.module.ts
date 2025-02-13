import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { Users } from 'src/db/entity/users.entity';
import { UserModule } from '../user/user.module';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 기본 전략 설정
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    forwardRef(()=>UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 서비스와 전략 제공
  exports: [AuthService, JwtStrategy, PassportModule], // 외부에서 사용 가능하도록 export
})
export class AuthModule {}
