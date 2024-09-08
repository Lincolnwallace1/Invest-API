import { Injectable } from '@nestjs/common';
import Z from 'zod';

import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';

import { IListInvestmentResponse } from '@views/investment/responses';

import { ListInvestmentSchema } from '@views/investment/schemas';

interface IRequest {
  data: Z.infer<typeof ListInvestmentSchema>;
}

@Injectable()
class ListInvestmentService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  public async execute({ data }: IRequest): Promise<IListInvestmentResponse> {
    const [investments, count] = await this.investmentRepository
      .list(
        { user: data.user, status: data.status },
        ['user_', 'history'],
        data.limit,
        data.offset,
      )
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
