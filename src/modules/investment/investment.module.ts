import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import InvestmentController from './investment.controller';
import { UserModule } from '@modules/user/user.module';
import { HistoryModule } from '@modules/history/history.module';

import Investment from '@entities/Investment';

import InvestmentRepository from './repository/InvestmentRepository';

import {
  CreateInvestmentService,
  GetInvestmentService,
  ListInvestmentService,
  WithdrawnInvestmentService,
  PaymentInvestmentService,
} from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UserModule, HistoryModule],
  providers: [
    InvestmentRepository,
    CreateInvestmentService,
    GetInvestmentService,
    ListInvestmentService,
    WithdrawnInvestmentService,
    PaymentInvestmentService,
  ],
  controllers: [InvestmentController],
})
export class InvestmentModule {}
