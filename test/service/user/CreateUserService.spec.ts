import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';

import { CreateUserService } from '@modules/user/useCases';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn(),
            create: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'johndoe@gmail.com',
              password: 'password',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should call execute method', async () => {
    await service.execute({
      data: {
        fullname: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
      },
    });

    expect(service).toBeDefined();
  });
});
