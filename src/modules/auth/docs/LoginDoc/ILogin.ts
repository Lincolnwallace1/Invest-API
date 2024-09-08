import { ApiProperty } from '@nestjs/swagger';

class ILogin {
  @ApiProperty({ example: 'jondue@gmail.com', required: true })
  email: string;

  @ApiProperty({ example: '123456', required: true })
  password: string;
}

export default ILogin;
