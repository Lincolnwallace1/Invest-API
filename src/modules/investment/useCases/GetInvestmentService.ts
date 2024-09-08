import { Inject, HttpStatus } from '@nestjs/common';
import AppError from '@common/erros/AppError';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { IGetInvestmentResponse } from '@modules/investment/responses';

interface IRequest {
  investment: number;
}

class GetInvestmentService {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
  ) {}

  public async execute({
    investment,
  }: IRequest): Promise<IGetInvestmentResponse> {
    const investmentRecord = await this.investmentRepository.get(
      { id: investment },
      ['history'],
    );

    if (!investmentRecord) {
      throw new AppError({
        name: 'Investment Not Found',
        errorCode: 'investment_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const investmentResponse: IGetInvestmentResponse = {
      investment: {
        id: investmentRecord.id,
        name: investmentRecord.name,
        initialDate: investmentRecord.initialDate,
        initialValue: Number(investmentRecord.initialValue),
        expectedValue: Number(investmentRecord.expectedValue),
        status: investmentRecord.status,
        history: investmentRecord.history
          ? investmentRecord.history.map((history) => ({
              date: history.date,
              valueWithdrawn: Number(history.valueWithdrawn),
              realValueWithdrawn: Number(history.realValueWithdrawn),
              tax: Number(history.tax),
            }))
          : [],
      },
    } as IGetInvestmentResponse;

    return investmentResponse;
  }
}

export default GetInvestmentService;
