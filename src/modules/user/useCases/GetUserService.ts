import { Inject, HttpStatus } from '@nestjs/common';

import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import { IGetUserResponse } from '@modules/user/responses';

interface IRequest {
  id: number;
}

class GetUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IGetUserResponse> {
    const user = await this.userRepository.get({ id, enabled: true });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    };
  }
}

export default GetUserService;
