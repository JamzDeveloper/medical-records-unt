import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) throw new UnauthorizedException('Token not valid');

    return user;
  }
}
