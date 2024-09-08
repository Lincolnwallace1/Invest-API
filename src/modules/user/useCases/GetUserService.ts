import { Inject, HttpStatus } from '@nestjs/common';

import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import { IGetUserResponse } from '@modules/user/responses';

interface IRequest {
  user: number;
}

class GetUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ user }: IRequest): Promise<IGetUserResponse> {
    const userRecord = await this.userRepository.get({
      id: user,
      enabled: true,
    });

    if (!userRecord) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return {
      id: userRecord.id,
      email: userRecord.email,
      fullname: userRecord.fullname,
    };
  }
}

export default GetUserService;
