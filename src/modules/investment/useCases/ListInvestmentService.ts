import { Inject } from '@nestjs/common';
import Z from 'zod';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { IListInvestmentResponse } from '@modules/investment/responses';

import { ListInvestmentSchema } from '@modules/investment/schemas';

interface IRequest {
  user: number;
  data: Z.infer<typeof ListInvestmentSchema>;
}

class ListInvestmentService {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
  ) {}

  public async execute({
    data,
    user,
  }: IRequest): Promise<IListInvestmentResponse> {
    const [investments, count] = await this.investmentRepository
      .list({ user, status: data.status }, ['history'], data.limit, data.offset)
      .catch((error) => {
        throw new Error(error);
      });

    const investmentsResponse: IListInvestmentResponse = {
      meta: {
        offset: data.offset,
        limit: data.limit,
        total: count,
      },
      records: investments.map((investment) => ({
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
      })),
    } as IListInvestmentResponse;

    return investmentsResponse;
  }
}

export default ListInvestmentService;
