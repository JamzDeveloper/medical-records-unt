import { Controller, Post, Get, ParseIntPipe, Param } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { RoleProtected } from '../../../auth/decorator/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { PatientCreateDto } from '../dtos/patient.dto';
import { Body } from '@nestjs/common/decorators';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post('create')
  @RoleProtected(ValidRoles.SUPERADMIN)
  async createDoctor(@Body() patient: PatientCreateDto) {
    return await this.patientService.createDoctor(patient);
  }
  @Get('all')
  @RoleProtected(ValidRoles.SUPERADMIN)
  async allPatients() {
    return await this.patientService.allPatient();
  }

  @Get('/:patientId')
  @RoleProtected(ValidRoles.SUPERADMIN,ValidRoles.DOCTOR)
  async onePatient(
    @Param('patientId', ParseIntPipe) patientId: number,

  ) {
    return await this.patientService.onePatient(patientId);
  }
}
