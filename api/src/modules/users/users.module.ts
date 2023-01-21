import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UsersController, UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
