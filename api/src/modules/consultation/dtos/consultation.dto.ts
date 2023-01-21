import { IsInt, IsOptional, IsString } from 'class-validator';

export class ConsultationCreateDto {
  @IsInt()
  medicalHistoryId: number;

  @IsInt()
  doctorId: number;

  @IsString()
  description: string;
}

export class ConsultationUpdateDto {
  @IsOptional()
  @IsInt()
  medicalHistoryId: number;

  @IsOptional()
  @IsInt()
  doctorId: number;

  @IsOptional()
  @IsString()
  description: string;
}
