import { ApiProperty } from '@nestjs/swagger';

class IWithdrawInvestment {
  @ApiProperty({ example: 10, required: true })
  value: number;
}

export default IWithdrawInvestment;
