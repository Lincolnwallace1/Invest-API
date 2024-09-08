import { ApiProperty } from '@nestjs/swagger';

class IWithdrawnInvestmentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  valueWithdrawn: number;

  @ApiProperty()
  realValueWithdrawn: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  status: string;
}

export default IWithdrawnInvestmentResponse;
