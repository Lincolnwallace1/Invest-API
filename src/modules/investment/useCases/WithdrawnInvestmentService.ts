import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import AppError from '@common/erros/AppError';

import UtilsDate from '@/utils/UtilsDate';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';
import HistoryRepository from '@modules/history/repository/HistoryRepository';

import { WithdrawInvestmentSchema } from '@modules/investment/schemas';

import { IWithdrawnInvestmentResponse } from '@modules/investment/responses';

interface IRequest {
  investment: number;
  data: Z.infer<typeof WithdrawInvestmentSchema>;
}

class WithdrawnInvestmentService {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
    @Inject(HistoryRepository)
    private historyRepository: HistoryRepository,
  ) {}

  public async execute({
    investment,
    data,
  }: IRequest): Promise<IWithdrawnInvestmentResponse> {
    const investmentRecord = await this.investmentRepository.get({
      id: investment,
    });

    if (!investmentRecord) {
      throw new AppError({
        name: 'Investment Not Found',
        errorCode: 'investment_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (data.value > investmentRecord.expectedValue) {
      throw new AppError({
        name: 'Value is not valid',
        errorCode: 'value_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const time = new UtilsDate().diferenceMonth(
      new Date(investmentRecord.initialDate),
      new Date(),
    );

    const tax = this.applyTax(data.value, time);

    if (data.value > investmentRecord.expectedValue) {
      throw new AppError({
        name: 'Not enough money',
        errorCode: 'not_enough_money',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const history = await this.historyRepository.create({
      investment: investmentRecord.id,
      date: new Date(),
      valueWithdrawn: data.value,
      realValueWithdrawn: data.value - tax,
      tax,
    });

    await this.investmentRepository.update(investmentRecord.id, {
      expectedValue: investmentRecord.expectedValue - data.value,
      status:
        investmentRecord.expectedValue - data.value === 0
          ? 'finished'
          : 'active',
    });

    return {
      id: history.id,
      date: history.date,
      valueWithdrawn: history.valueWithdrawn,
      realValueWithdrawn: history.realValueWithdrawn,
      tax: history.tax,
      status:
        investmentRecord.expectedValue - data.value === 0
          ? 'finished'
          : 'active',
    };
  }

  private applyTax(value: number, time: number): number {
    if (time < 12) {
      return value * 0.225;
    } else if (12 <= time && time < 24) {
      return value * 0.185;
    } else if (24 <= time) {
      return value * 0.15;
    }
  }
}

export default WithdrawnInvestmentService;
