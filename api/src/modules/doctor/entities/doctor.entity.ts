import { Auditory } from 'src/common/entities/auditory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OneToMany } from 'typeorm';
import { Consultation } from '../../consultation/entities/consultation.entity';

@Entity()
export class Doctor extends Auditory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Consultation, (consultation) => consultation.doctor)
  consultations: Consultation[];
}
