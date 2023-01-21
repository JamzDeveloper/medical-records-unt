import { Injectable, BadRequestException } from '@nestjs/common';
import { MedicalHistory } from '../entity/medical-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistoryCreateDto } from '../dtos/medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  async createMedicalHistory(medicalHistoryData: MedicalHistoryCreateDto) {
    const code = Math.ceil(Math.random() * (1000000 - 100000) + 100000);

    const newMedicalHistory = await this.medicalHistoryRepository.save({
      ...medicalHistoryData,
      code: code.toString(),
    });

    if (!medicalHistoryData) {
      throw new BadRequestException('error when creating medical history');
    }
    return newMedicalHistory;
  }
  async oneMedicalHistory(medicalHistoryId: number) {
    return await this.medicalHistoryRepository.findOne({
      where: { id: medicalHistoryId },
      relations: {
        consultations: {
         doctor:{
          user:true
         } 
        },
      },
    });
  }
}
