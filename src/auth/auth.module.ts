import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 기본 전략 설정
    TypeOrmModule.forFeature([User]), // TypeORM에서 User 엔티티 사용
    JwtModule.register({
      secret: "123456", // JWT 서명 비밀 키
      signOptions: {
        expiresIn: 360000 * 1000, // 만료 시간
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 서비스와 전략 제공
  exports: [AuthService, JwtStrategy, PassportModule], // 외부에서 사용 가능하도록 export
})
export class AuthModule {}
