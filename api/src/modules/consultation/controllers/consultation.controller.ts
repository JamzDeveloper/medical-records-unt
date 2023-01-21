import { Controller, Post } from '@nestjs/common';
import { ConsultationService } from '../services/consultation.service';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { ValidRoles } from '../../../auth/interfaces/valid-roles';
import { RoleProtected } from '../../../auth/decorator/role-protected.decorator';
import { Body } from '@nestjs/common/decorators';
import { ConsultationCreateDto } from '../dtos/consultation.dto';

@Controller('consultation')
export class ConsultationController {

    constructor(private consultationService: ConsultationService) {}

    @Post('create')
    @RoleProtected(ValidRoles.DOCTOR)
    async createDoctor(@Body() consultation: ConsultationCreateDto) {
      return await this.consultationService.createConsultation(consultation);
    }
}
