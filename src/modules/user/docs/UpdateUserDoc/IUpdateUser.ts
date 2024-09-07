import { ApiProperty } from '@nestjs/swagger';

class IUpdateUser {
  @ApiProperty({ example: 'jondue@gmail.com', required: false })
  email: string;

  @ApiProperty({ example: 'Jon Due', required: false })
  fullname: string;

  @ApiProperty({ example: '123456', required: false })
  password: string;
}

export default IUpdateUser;
