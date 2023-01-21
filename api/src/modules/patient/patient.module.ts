import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
import { Patient } from './entity/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { MedicalHistoryModule } from '../medical-history/medical-history.module';
import { User } from 'src/modules/users/entities/user.entity';
import { MedicalHistory } from '../medical-history/entity/medical-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, User, MedicalHistory]),
    UsersModule,
    MedicalHistoryModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
