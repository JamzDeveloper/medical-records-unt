import { IsInt, IsString } from 'class-validator';

export class ConsultationCreateDto {
  @IsInt()
  medicalHistoryId: number;

  @IsInt()
  doctorId: number;

  @IsString()
  description: string;
}
