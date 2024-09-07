import { ApiProperty } from '@nestjs/swagger';

class IGetUserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}

export default IGetUserResponse;
