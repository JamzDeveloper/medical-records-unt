import { IsString } from 'class-validator';

export class MedicalHistoryCreateDto{

    @IsString()
    familyHistory: string;

    @IsString()
    diagnsedDiseases: string;
}