import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from '../entities/consultation.entity';
import { ConsultationCreateDto } from '../dtos/consultation.dto';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { MedicalHistory } from '../../medical-history/entity/medical-history.entity';
import { User } from 'src/modules/users/entities/user.entity';

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

  async oneConsultation(consultationId: number) {
    const result = await this.consultationRepository.findOne({
      where: { id: consultationId },
      relations: {
        doctor: {
          user: true,
        },
      },
    });
    if(!result){
      throw new BadRequestException(`Consultation with id:${consultationId} not found`);
    }
    return result
  }

  async updateConsultation(
    dataConsultation: ConsultationCreateDto,
    id: number,
  ) {
    const foundConsultation = await this.consultationRepository.findOneBy({
      id,
    });
    if (!foundConsultation) {
      throw new BadRequestException(`Consultation with id:${id} not found`);
    }

    await this.consultationRepository.update(id, {
      ...dataConsultation,
    });
    return {
      ...foundConsultation,
      ...dataConsultation,
    };
  }

  async deleteConsultation(user: User, consultationId: number) {
    const foundConsultation = await this.consultationRepository.findOne({
      relations: {
        doctor: true,
      },
      where: { id: consultationId },
    });

    if (!foundConsultation) {
      throw new BadRequestException(
        `Consultation with id:${consultationId} not found`,
      );
    }
    console.log(user);
    const foundDoctor = await this.doctorRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    console.log(foundDoctor);

    if (foundDoctor.id != foundConsultation.doctor.id) {
      throw new UnauthorizedException();
    }
    const result = await this.consultationRepository.delete(consultationId);
    return result ? true : false;
  }
}
