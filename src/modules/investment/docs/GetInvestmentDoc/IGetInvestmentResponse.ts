import { ApiProperty } from '@nestjs/swagger';

class InvestmentHistoryResponse {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  valueWithdrawn: number;

  @ApiProperty()
  realValueWithdrawn: number;

  @ApiProperty()
  tax: number;
}

class InvestmentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  initialDate: Date;

  @ApiProperty()
  initialValue: number;

  @ApiProperty()
  expectedValue: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: [InvestmentHistoryResponse] })
  history: InvestmentHistoryResponse[];
}

class IGetInvestmentResponse {
  @ApiProperty({ type: InvestmentResponse })
  investment: InvestmentResponse;
}

export default IGetInvestmentResponse;
