import { ApiProperty } from '@nestjs/swagger';

class ICreateInvestment {
  @ApiProperty({ example: 'I341F', required: true })
  name: string;

  @ApiProperty({ example: 1000, required: true })
  initialValue: number;

  @ApiProperty({ example: '2024-02-01', required: true })
  initialDate: string;
}

export default ICreateInvestment;
