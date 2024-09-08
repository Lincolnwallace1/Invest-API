import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Investment from './Investment';

@Entity('user')
class User {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id: number;

  @Column({ type: 'character varying', name: 'fullname', length: 255 })
  fullname: string;

  @Column({
    type: 'character varying',
    name: 'email',
    length: 255,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({ type: 'character varying', name: 'password', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'boolean', name: 'enabled', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Investment, (investment) => investment.user_)
  investments: Investment[];
}

export default User;
