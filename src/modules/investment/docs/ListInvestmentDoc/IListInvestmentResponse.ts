import { ApiProperty } from '@nestjs/swagger';

class MetaData {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

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

class Records {
  @ApiProperty({ type: InvestmentResponse })
  investment: InvestmentResponse;
}

class IListInvestmentResponse {
  @ApiProperty({ type: MetaData })
  meta: MetaData;

  @ApiProperty({ type: [Records] })
  records: Records[];
}

export default IListInvestmentResponse;
