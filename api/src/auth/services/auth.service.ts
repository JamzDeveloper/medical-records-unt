import { compare } from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../../modules/users/dtos/user.dto';
import { Repository } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: UserLoginDto) {
    try {
      const { email, password } = user;

      const foundUser = await this.userRepository.findOne({
        where: [{ email }, { username: email }],
      });

      if (!foundUser) throw new UnauthorizedException();

      const match = await compare(password, foundUser.password);
      if (!match) throw new UnauthorizedException();

      const tokens = this.generateTokens({ id: foundUser.id });

      return { user: foundUser, ...tokens };
    } catch (err) {
      throw err;
    }
  }
  private generateTokens(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: process.env.REFRESH_EXPIRES_IN,
      }),
    };
  }
  async refreshToken(refresh: string) {
    // console.log(refresh);
    const validate = await this.jwtService.verify(refresh, {
      secret: process.env.REFRESH_SECRET,
    });

    if (!validate) throw new Error('refresh token expires');

    const { id } = validate;

    return this.generateTokens({
      id,
    });
  }
}
