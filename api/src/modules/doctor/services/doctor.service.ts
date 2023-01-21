import { Injectable, BadRequestException } from '@nestjs/common';
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
    const result = await this.userServices.createUser(user);
    return await this.doctorRepository.save({
      user: result,
    });
  }
  async allDoctors() {
    return await this.doctorRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async oneDoctor(doctorId: number) {
    const foundDoctor = await this.doctorRepository.findOne({
      relations:{
        user:true
      },
      where: { id: doctorId },
    });
    if (!foundDoctor) {
      throw new BadRequestException(`Doctro with id:${doctorId} not found`);
    }
    return foundDoctor;
  }
}
