import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';

@Module({
  controllers: [InvestmentController],
})
export class InvestmentModule {}
