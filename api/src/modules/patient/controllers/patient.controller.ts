import { Controller, Post } from '@nestjs/common';
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
}
