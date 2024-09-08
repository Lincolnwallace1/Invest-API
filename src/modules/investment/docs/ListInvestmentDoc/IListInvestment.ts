import { ApiProperty } from '@nestjs/swagger';

class IListInvestmentDTO {
  @ApiProperty({ example: 50 })
  limit: number;

  @ApiProperty({ example: 0 })
  offset: number;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'finished'],
    required: false,
  })
  status?: string;
}

export default IListInvestmentDTO;
