import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dtos/user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: UserCreateDto) {
    const { username } = user;

    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (foundUser) {
      throw new BadRequestException(
        `user with username:${username} already exists`,
      );
    }

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    return await this.userRepository.save({
      ...user,
      photo: '',
      username,
    });
  }
}
