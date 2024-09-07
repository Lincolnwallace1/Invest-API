import { ApiProperty } from '@nestjs/swagger';

class ICreateUserResponse {
  @ApiProperty()
  id: number;
}

export default ICreateUserResponse;
