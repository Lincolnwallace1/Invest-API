import { ApiProperty } from '@nestjs/swagger';

class ICreateUser {
  @ApiProperty({ example: 'jondue@gmail.com', required: true })
  email: string;

  @ApiProperty({ example: 'Jon Due', required: true })
  fullname: string;

  @ApiProperty({ example: '123456', required: true })
  password: string;
}

export default ICreateUser;
