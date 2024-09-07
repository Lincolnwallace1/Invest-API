import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import AppError from '@common/erros/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import { UpdateUserSchema } from '@modules/user/schemas';

interface IRequest {
  user: number;
  data: Z.infer<typeof UpdateUserSchema>;
}

class UpdateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ user, data }: IRequest): Promise<void> {
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

    await this.userRepository.update(userRecord.id, {
      ...data,
      password: data.password ? await argon2.hash(data.password) : undefined,
    });
  }
}

export default UpdateUserService;
