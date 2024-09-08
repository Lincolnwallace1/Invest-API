import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import AppError from '@common/erros/AppError';

import UtilsDate from '@/utils/UtilsDate';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { CreateInvestmentSchema } from '@modules/investment/schemas';

import { ICreateInvestmentResponse } from '@modules/investment/responses/';

interface IRequest {
  user: number;
  data: Z.infer<typeof CreateInvestmentSchema>;
}

class CreateInvestmentService {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
  ) {}

  public async execute({
    data,
    user,
  }: IRequest): Promise<ICreateInvestmentResponse> {
    const investmentRecord = await this.investmentRepository.get({
      user: user,
      name: data.name,
    });

    if (investmentRecord) {
      throw new AppError({
        name: 'Investment Already Exists',
        errorCode: 'investment_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    if (data.initialValue <= 0) {
      throw new AppError({
        name: 'Value is not valid',
        errorCode: 'value_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (new Date(data.initialDate) > new Date()) {
      throw new AppError({
        name: 'Date is not valid',
        errorCode: 'date_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const months = new UtilsDate().diferenceMonth(
      new Date(data.initialDate),
      new Date(),
    );
    const t = months;
    const r = 0.0052;

    const expectedValue = this.calculateInterest(data.initialValue, r, t);

    const investment = await this.investmentRepository.create({
      user,
      name: data.name,
      initialDate: data.initialDate,
      initialValue: data.initialValue,
      expectedValue: expectedValue,
    });

    return {
      ...investment,
    };
  }

  private calculateInterest = (P: number, r: number, t: number): number => {
    return P * Math.pow(1 + r, t);
  };
}

export default CreateInvestmentService;
