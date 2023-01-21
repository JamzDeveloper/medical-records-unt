import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from '../entities/consultation.entity';
import { ConsultationCreateDto } from '../dtos/consultation.dto';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { MedicalHistory } from '../../medical-history/entity/medical-history.entity';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(MedicalHistory)
    private medicalHistorypository: Repository<MedicalHistory>,
  ) {}

  async createConsultation(consultationData: ConsultationCreateDto) {
    const { doctorId, medicalHistoryId, ...restData } = consultationData;

    const foundDoctor = await this.doctorRepository.findOneBy({
      id: doctorId,
    });
    if (!foundDoctor) {
      throw new BadRequestException(`doctor with id:${doctorId}`);
    }
    const foundMedicalHistory = await this.medicalHistorypository.findOneBy({
      id: medicalHistoryId,
    });
    if (!foundMedicalHistory) {
      throw new BadRequestException(`Medical history with id:${doctorId}`);
    }

    return await this.consultationRepository.save({
      ...restData,
      doctor: foundDoctor,
      medicalHistory: foundMedicalHistory,
    });
  }
}
