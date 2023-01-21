import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Auditory } from '../../../common/entities/auditory.entity';
import { Consultation } from '../../consultation/entities/consultation.entity';

@Entity()
export class MedicalHistory extends Auditory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'code', type: 'varchar', length: 45 })
  code: string;

  @Column({ name: 'family_history', type: 'text' })
  familyHistory: string;

  @Column({ name: 'diagnsed_diseases', type: 'text' })
  diagnsedDiseases: string;

  @OneToMany(() => Consultation, (consultation) => consultation.medicalHistory)
  consultations: Consultation[]
}
