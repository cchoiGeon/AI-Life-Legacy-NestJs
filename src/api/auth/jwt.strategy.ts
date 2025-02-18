import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { Users } from 'src/db/entity/users.entity';
import { UserRepository } from '../user/user.repository';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { uuid } = payload;
    const user: Users = await this.userRepository.findUserByUUID(uuid);
    if (!user) {
      throw new UnauthorizedException('NOT_EXIST_USER');
    }

    return user.uuid;
  }
}
