import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MedicalHistoryService } from '../services/medical-history.service';

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
