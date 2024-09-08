import { Injectable, HttpStatus } from '@nestjs/common';
import AppError from '@common/erros/AppError';

import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';

import { IGetInvestmentResponse } from '@views/investment/responses';

interface IRequest {
  id: number;
}

@Injectable()
class GetInvestmentService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  public async execute({ id }: IRequest): Promise<IGetInvestmentResponse> {
    const investment = await this.investmentRepository.get({ id }, [
      'user_',
      'history',
    ]);

    if (!investment) {
      throw new AppError({
        name: 'Investment Not Found',
        errorCode: 'investment_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const investmentResponse: IGetInvestmentResponse = {
      user: {
        id: investment.user_.id,
        fullname: investment.user_.fullname,
        email: investment.user_.email,
      },
      investment: {
        id: investment.id,
        name: investment.name,
        initialDate: investment.initialDate,
        initialValue: Number(investment.initialValue),
        expectedValue: Number(investment.expectedValue),
        status: investment.status,
        history: investment.history
          ? investment.history.map((history) => ({
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
