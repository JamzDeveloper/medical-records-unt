import { Auditory } from '../../../common/entities/auditory.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { MedicalHistory } from '../../medical-history/entity/medical-history.entity';

@Entity()
export class Patient extends Auditory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => MedicalHistory)
  @JoinColumn({ name: 'medical_history_id' })
  medicalHistory: MedicalHistory;

  @Column({ name: 'dni', length: 8, type: 'varchar' })
  dni: string;

  @Column({ name: 'date_birth', type: 'date' })
  dateBirth: Date;
}
