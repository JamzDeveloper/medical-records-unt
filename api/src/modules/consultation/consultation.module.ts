import { Module } from '@nestjs/common';
import { ConsultationService } from './services/consultation.service';
import { ConsultationController } from './controllers/consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { MedicalHistory } from '../medical-history/entity/medical-history.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation,MedicalHistory,Doctor])],
  providers: [ConsultationService],
  controllers: [ConsultationController],
})
export class ConsultationModule {}
