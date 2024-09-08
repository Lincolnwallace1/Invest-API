import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Investment from '@entities/Investment';

@Entity('history')
class History {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id: number;

  @Column({ type: 'smallint', name: 'investment' })
  investment: number;

  @Column({ type: 'decimal', name: 'valueWithdrawn', precision: 10, scale: 2 })
  valueWithdrawn: number;

  @Column({
    type: 'decimal',
    name: 'realValueWithdrawn',
    precision: 10,
    scale: 2,
  })
  realValueWithdrawn: number;

  @Column({ type: 'timestamp', name: 'date' })
  date: Date;

  @Column({ type: 'decimal', name: 'tax', precision: 10, scale: 2 })
  tax: number;

  @ManyToOne(() => Investment, (investment) => investment.history)
  @JoinColumn({ name: 'investment', referencedColumnName: 'id' })
  investment_: Investment;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;
}

export default History;
