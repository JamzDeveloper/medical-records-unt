import { Injectable } from '@nestjs/common';
import { Doctor } from '../entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorCreateDto } from '../dtos/doctor.dto';
import { UsersService } from '../../users/services/users.service';
import { TYPEUSER } from 'src/common/enum/user.enum';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private userServices: UsersService,
  ) {}

  async createDoctor(doctor: DoctorCreateDto) {
    const { user } = doctor;
    user.role = TYPEUSER.DOCTOR;
    const result = await this.userServices.createUser(user)
    return await this.doctorRepository.save({
      user: result,
    });
  }
}
