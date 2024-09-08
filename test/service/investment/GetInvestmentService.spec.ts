import { Test, TestingModule } from '@nestjs/testing';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { GetInvestmentService } from '@modules/investment/useCases';

describe('GetInvestmentService', () => {
  let service: GetInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Investment',
              initialValue: 1000,
              initialDate: new Date(),
              status: 'active',
              history: [],
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GetInvestmentService>(GetInvestmentService);
  });

  it('should call execute method', async () => {
    await service.execute({
      investment: 1,
    });

    expect(service).toBeDefined();
  });
});
