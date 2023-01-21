import { IsDate, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserCreateDto } from 'src/modules/users/dtos/user.dto';
import { MedicalHistory } from '../../medical-history/entity/medical-history.entity';
import { MedicalHistoryCreateDto } from '../../medical-history/dtos/medical-history.dto';

export class PatientCreateDto {
  @ValidateNested()
  @Type(() => UserCreateDto)
  user: UserCreateDto;

  @ValidateNested()
  @Type(() => MedicalHistoryCreateDto)
  medicalHistory: MedicalHistoryCreateDto;

  @IsString()
  @Length(8)
  dni: string;

  @IsDate()
  @Type(() => Date)
  dateBirth: Date;
}
