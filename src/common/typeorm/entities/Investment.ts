import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import User from '@entities/User';
import History from '@entities/History';

@Entity('investment')
class Investment {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id: number;

  @Column({ type: 'smallint', name: 'user' })
  user: number;

  @Column({ type: 'varchar', name: 'name', length: 255 })
  name: string;

  @Column({ type: 'decimal', name: 'initialValue', precision: 10, scale: 2 })
  initialValue: number;

  @Column({
    type: 'decimal',
    name: 'expectedValue',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  expectedValue: number;

  @Column({ type: 'timestamp', name: 'initialDate' })
  initialDate: Date;

  @Column({ type: 'varchar', name: 'status', length: 32, default: 'active' })
  status: string;

  @ManyToOne(() => User, (user) => user.investments)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user_: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => History, (history) => history.investment_)
  history: History[];
}

export default Investment;
