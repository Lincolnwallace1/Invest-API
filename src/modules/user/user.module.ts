import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';

import User from '@entities/User';

import UserRepository from './repository/UserRepository';

import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
  DeleteUserService,
} from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    CreateUserService,
    GetUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
