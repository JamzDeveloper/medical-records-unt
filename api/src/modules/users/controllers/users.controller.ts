import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

import { RoleProtected } from '../../../auth/decorator/role-protected.decorator';
import { UserCreateDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Controller('user')
export class UsersController {
    

}
