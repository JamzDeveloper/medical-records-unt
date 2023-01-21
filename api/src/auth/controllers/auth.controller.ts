import {
  Body,
  Controller,
  Post,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AllowedUser } from '../decorator/allowed.decorator';
import { UserLoginDto } from '../../modules/users/dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorator/get-user.decorator';
import { User } from '../../modules/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authServide: AuthService) {}

  @Post('login')
  @AllowedUser()
  async login(@Body() user: UserLoginDto) {
    try {
      const dataLogin = await this.authServide.login(user);
      return dataLogin;
    } catch (err) {
      throw err;
    }
  }
  @Post('refresh-token')
  @AllowedUser()
  async refreshToken(@Headers('refresh') refreshToken: string) {
    try {
      return await this.authServide.refreshToken(refreshToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post('hola')
  async hola(@GetUser() user: User){

  }
}
