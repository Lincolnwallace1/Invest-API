import { ApiProperty } from '@nestjs/swagger';

class ILoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: number;
}

export default ILoginResponse;
