import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MedicalHistoryService } from '../services/medical-history.service';
import { RoleProtected } from '../../../auth/decorator/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private medicalHistoryService: MedicalHistoryService) {}

  @Get('/:medicalHistoryId')
  async oneMedicalHistory(
    @Param('medicalHistoryId', ParseIntPipe) medicalHistoryId: number,
  ) {
    return await this.medicalHistoryService.oneMedicalHistory(medicalHistoryId);
  }
}
