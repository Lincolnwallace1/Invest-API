import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import History from '@entities/History';

import HistoryRepository from '@modules/history/repository/HistoryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryRepository],
  exports: [HistoryRepository],
})
export class HistoryModule {}
