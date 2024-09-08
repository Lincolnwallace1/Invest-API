import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@modules/user/repository/UserRepository';
import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { CreateInvestmentService } from '@modules/investment/useCases';

describe('CreateInvestmentService', () => {
  let service: CreateInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            get: jest.fn(),
            create: jest.fn().mockResolvedValueOnce({
              id: 1,
              user: 1,
              name: 'Investment',
              initialValue: 1000,
              initialDate: new Date(),
            }),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'johndoe@gmail.com',
              password: 'password',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreateInvestmentService>(CreateInvestmentService);
  });

  it('should call execute method', async () => {
    await service.execute({
      user: 1,
      data: {
        name: 'Investment',
        initialValue: 1000,
        initialDate: new Date().toString(),
      },
    });

    expect(service).toBeDefined();
  });
});
