import { Injectable } from '@nestjs/common';
import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';

@Injectable()
class PaymentInvestmentService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

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
