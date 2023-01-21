import { Auditory } from '../../../common/entities/auditory.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { STATUSUSER, TYPEUSER } from '../../../common/enum/user.enum';

@Entity()
export class User extends Auditory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, length: 45, type: 'varchar' })
  name: string;

  @Column({ nullable: false, length: 45, type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ nullable: false, type: 'varchar' })
  photo: string;

  @Column({ length: 45, unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ length: 45, unique: true, nullable: false, type: 'varchar' })
  username: string;

  // @Column({ nullable: true, type: 'varchar', default: null })
  // address: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'enum', enum: STATUSUSER, default: STATUSUSER.ACTIVE })
  status: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, unique: true })
  password: string;

  @Column({
    length: 15,
    type: 'varchar',
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: TYPEUSER,
    default: TYPEUSER.PATIENT,
  })
  role: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', name: 'recovery_code',default:null })
  recoveryCode: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
