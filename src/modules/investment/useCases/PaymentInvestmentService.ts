import { Inject } from '@nestjs/common';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

class PaymentInvestmentService {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
  ) {}

  public async execute(): Promise<void> {
    const investments = await this.investmentRepository.paymentList();

    for (const investment of investments) {
      await this.investmentRepository.update(investment.id, {
        expectedValue: investment.expectedValue * Math.pow(1 + 0.0052, 1),
      });
    }

    console.log('Payment Investments');
  }
}

export default PaymentInvestmentService;
