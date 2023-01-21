import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entity/patient.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { PatientCreateDto } from '../dtos/patient.dto';
import { TYPEUSER } from '../../../common/enum/user.enum';
import { MedicalHistoryService } from '../../medical-history/services/medical-history.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private userServices: UsersService,
    private medicalHistoryServices: MedicalHistoryService,
  ) {}

  async createDoctor(patient: PatientCreateDto) {
    const { user, medicalHistory, ...rest } = patient;
    user.role = TYPEUSER.PATIENT;
    const newUSer = await this.userServices.createUser(user);
    if (!newUSer) {
      throw new BadRequestException('error when creating the user');
    }
    const newMedicalHistory =
      await this.medicalHistoryServices.createMedicalHistory(medicalHistory);

    return await this.patientRepository.save({
      ...rest,
      user: newUSer,
      medicalHistory: newMedicalHistory,
    });
  }
}
