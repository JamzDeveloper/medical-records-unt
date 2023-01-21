import { OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TYPEUSER } from '../../../common/enum/user.enum';

export class UserCreateDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly lastName: string;

  @IsString()
  readonly username: string;
  @IsString()
  @IsEmail()
  readonly email: string;

  // @IsOptional()
  // @IsString()
  // address: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  @IsString()
  role: TYPEUSER;

  @IsString()
  @Length(9, 15)
  readonly phoneNumber: string;
}

export class UserReadDto extends OmitType(UserCreateDto, [
  'name',
  'phoneNumber',
  'lastName',
  // 'address',
  'role',
  'username',
]) {}

export class UserLoginDto {
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
}
