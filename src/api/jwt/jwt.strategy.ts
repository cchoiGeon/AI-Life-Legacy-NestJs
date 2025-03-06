import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from '../../db/entity/users.entity';
import { Repository } from 'typeorm';
import { CustomNotFoundException } from '../../common/exception/exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { uuid } = payload;
    const user: Users = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new CustomNotFoundException('Not Found User');
    }
    return user;
  }
}
