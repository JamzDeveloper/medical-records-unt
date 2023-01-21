import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserCreateDto } from 'src/modules/users/dtos/user.dto';

export class DoctorCreateDto {
    @ValidateNested()
    @Type(() => UserCreateDto)
    user: UserCreateDto; 
}