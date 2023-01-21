import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ConsultationService } from '../services/consultation.service';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { ValidRoles } from '../../../auth/interfaces/valid-roles';
import { RoleProtected } from '../../../auth/decorator/role-protected.decorator';
import { Body } from '@nestjs/common/decorators';
import { ConsultationCreateDto, ConsultationUpdateDto } from '../dtos/consultation.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private consultationService: ConsultationService) {}

  @Get('/:consultationId')
  async oneConsultation(
    @Param('consultationId', ParseIntPipe) consultationId: number,
  ) {
    return await this.consultationService.oneConsultation(consultationId);
  }

  @Post('create')
  @RoleProtected(ValidRoles.DOCTOR)
  async createDoctor(@Body() consultation: ConsultationCreateDto) {
    return await this.consultationService.createConsultation(consultation);
  }
  @Patch('/:consultationId')
  @RoleProtected(ValidRoles.DOCTOR)
  async updateConsultation(
    @Param('consultationId', ParseIntPipe) consultationId: number,
    @Body() consultationData: ConsultationUpdateDto,
  ) {
    return await this.consultationService.updateConsultation(
      consultationData,
      consultationId,
    );
  }
}
