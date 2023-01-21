import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User]), UsersModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
