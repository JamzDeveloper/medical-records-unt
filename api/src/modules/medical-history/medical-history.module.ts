import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './services/medical-history.service';
import { MedicalHistoryController } from './controllers/medical-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entity/medical-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory])],
  providers: [MedicalHistoryService],
  controllers: [MedicalHistoryController],
  exports: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
