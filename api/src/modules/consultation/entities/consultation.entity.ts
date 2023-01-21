import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Auditory } from '../../../common/entities/auditory.entity';
import { MedicalHistory } from '../../medical-history/entity/medical-history.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity()
export class Consultation extends Auditory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({name:'description',type:'text'})
  description:string;
  
  @ManyToOne(
    () => MedicalHistory,
    (medicalHistory) => medicalHistory.consultations,
  )
  medicalHistory: MedicalHistory;

  @ManyToOne(() => Doctor, (doctor) => doctor.consultations)
  doctor: Doctor;
}
