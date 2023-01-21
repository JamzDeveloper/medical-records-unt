import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { User } from '../modules/users/entities/user.entity';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from '../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './estrategies/local.strategy';
import { JwtStrategy } from './estrategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expiresIn,
          },
        };
      },
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
