import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import envsConfig from './config/envs.config';
import mainConfig from './config/config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envsConfig[process.env.NODE_ENV] || '.env.dev',
      load: [mainConfig, , jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    MedicalHistoryModule,
    ConsultationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
