import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto, JwtTokenResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import * as config from 'config';
import { CustomConflictException, CustomNotFoundException, CustomUnauthorizedException } from '../../common/exception/exception';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<JwtTokenResponseDto> {
    const { email, password } = authCredentialsDto;

    const existUser = await this.userRepository.findUserByEmail(email);
    if (existUser) throw new CustomConflictException('Exist Email');

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createAndSaveUserByEmailAndPassword(email, hashPassword);

    const payload = { uuid: newUser.uuid };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfig.access_token_secret,
      expiresIn: jwtConfig.access_token_expires_in,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConfig.refresh_token_secret,
      expiresIn: jwtConfig.refresh_token_expires_in,
    });

    await this.userRepository.updateUserRefreshToken(newUser.uuid, refreshToken);
    return { accessToken, refreshToken };
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtTokenResponseDto> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new CustomNotFoundException('User not found');

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new CustomUnauthorizedException('Invalid credentials');

    const payload = { uuid: user.uuid };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfig.access_token_secret,
      expiresIn: jwtConfig.access_token_expires_in,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConfig.refresh_token_secret,
      expiresIn: jwtConfig.refresh_token_expires_in,
    });
    await this.userRepository.updateUserRefreshToken(user.uuid, refreshToken);
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<JwtTokenResponseDto> {
    // 1. 해당 리프레시 토큰이 유효한지 validate 하기
    const payload = this.jwtService.verify(refreshToken, { secret: jwtConfig.refresh_token_secret });

    // 2. 만약 유효하다면, 사용자 데이터베이스에 존재하는 refreshToken과 비교하기
    const user = await this.userRepository.findUserByUUID(payload.uuid);
    if (!user.refreshToken) throw new CustomUnauthorizedException('유저에 Refresh Token 정보가 없습니다.');
    if (user.refreshToken != refreshToken) throw new CustomUnauthorizedException('일치하지 않는 Refresh 토큰입니다.');

    const newAccessToken = this.jwtService.sign(
      { uuid: payload.uuid },
      {
        secret: jwtConfig.access_token_secret,
        expiresIn: jwtConfig.access_token_expires_in,
      },
    );
    const newRefreshToken = this.jwtService.sign(
      { uuid: payload.uuid },
      {
        secret: jwtConfig.refresh_token_secret,
        expiresIn: jwtConfig.refresh_token_expires_in,
      },
    );

    await this.userRepository.updateUserRefreshToken(user.uuid, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
