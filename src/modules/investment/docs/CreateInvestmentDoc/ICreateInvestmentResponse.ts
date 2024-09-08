import { ApiProperty } from '@nestjs/swagger';

class ICreateInvestmentResponse {
  @ApiProperty()
  id: number;
}

export default ICreateInvestmentResponse;
