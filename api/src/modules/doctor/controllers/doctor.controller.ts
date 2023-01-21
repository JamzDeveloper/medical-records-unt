import { Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { DoctorService } from '../services/doctor.service';
import { Body } from '@nestjs/common/decorators';
import { DoctorCreateDto } from '../dtos/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('create')
  @RoleProtected(ValidRoles.SUPERADMIN)
  async createDoctor(@Body() doctor: DoctorCreateDto) {
    return await this.doctorService.createDoctor(doctor);
  }

  @Get('all')
  @RoleProtected(ValidRoles.SUPERADMIN)
  async allDoctors() {
    return await this.doctorService.allDoctors();
  }
  @Get('/:doctorId')
  @RoleProtected(ValidRoles.SUPERADMIN)
  async oneDoctor(@Param('doctorId', ParseIntPipe) doctorId: number) {
    return await this.doctorService.oneDoctor(doctorId);
  }
}
