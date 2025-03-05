import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from '../../db/entity/users.entity';
import { Repository } from 'typeorm';
import * as config from 'config';
import { CustomNotFoundException } from '../../common/exception/exception';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: jwtConfig.access_token_secret,
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
