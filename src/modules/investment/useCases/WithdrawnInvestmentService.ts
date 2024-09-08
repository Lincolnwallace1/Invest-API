import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import AppError from '@common/erros/AppError';

import UtilsDate from '@/utils/UtilsDate';

import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';
import HistoryRepository from '@model/history/repositorie/HistoryRepositorie';

import { UpdateInvestmentSchema } from '@views/investment/schemas';

import { IWithdrawnInvestmentResponse } from '@views/investment/responses';

interface IRequest {
  id: number;
  data: Z.infer<typeof UpdateInvestmentSchema>;
}

@Injectable()
class WithdrawnInvestmentService {
  constructor(
    private readonly investmentRepository: InvestmentRepository,
    private readonly historyRepository: HistoryRepository,
  ) {}

  public async execute({
    id,
    data,
  }: IRequest): Promise<IWithdrawnInvestmentResponse> {
    const investment = await this.investmentRepository.get({ id });

    if (!investment) {
      throw new AppError({
        name: 'Investment Not Found',
        errorCode: 'investment_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (data.value > investment.expectedValue) {
      throw new AppError({
        name: 'Value is not valid',
        errorCode: 'value_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const time = new UtilsDate().diferenceMonth(
      new Date(investment.initialDate),
      new Date(),
    );

    const tax = this.applyTax(data.value, time);

    if (data.value > investment.expectedValue) {
      throw new AppError({
        name: 'Not enough money',
        errorCode: 'not_enough_money',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const history = await this.historyRepository.create({
      investment: investment.id,
      date: new Date(),
      valueWithdrawn: data.value,
      realValueWithdrawn: data.value - tax,
      tax,
    });

    await this.investmentRepository.update(investment.id, {
      expectedValue: investment.expectedValue - data.value,
      status:
        investment.expectedValue - data.value === 0 ? 'finished' : 'active',
    });

    return {
      id: history.id,
      date: history.date,
      valueWithdrawn: history.valueWithdrawn,
      realValueWithdrawn: history.realValueWithdrawn,
      tax: history.tax,
      status:
        investment.expectedValue - data.value === 0 ? 'finished' : 'active',
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
