import { Inject, HttpStatus } from '@nestjs/common';
import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

interface IRequest {
  user: number;
}

class DeleteUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ user }: IRequest): Promise<void> {
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

    await this.userRepository.update(userRecord.id, { enabled: false });
  }
}

export default DeleteUserService;
