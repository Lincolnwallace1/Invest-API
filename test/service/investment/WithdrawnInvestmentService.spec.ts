import { Test, TestingModule } from '@nestjs/testing';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';
import HistoryRepository from '@modules/history/repository/HistoryRepository';

import { WithdrawInvestmentService } from '@modules/investment/useCases';

describe('WithdrawInvestmentService', () => {
  let service: WithdrawInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            get: jest.fn().mockResolvedValueOnce({
              id: 1,
              expectedValue: 100,
              initialDate: new Date(),
            }),
            update: jest.fn(),
          },
        },
        {
          provide: HistoryRepository,
          useValue: {
            create: jest.fn().mockResolvedValueOnce({
              id: 1,
              investment: 1,
              date: new Date(),
              valueWithdrawn: 100,
              realValueWithdrawn: 100,
              tax: 0,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WithdrawInvestmentService>(WithdrawInvestmentService);
  });

  it('should call execute method', async () => {
    await service.execute({
      investment: 1,
      data: {
        value: 100,
      },
    });

    expect(service).toBeDefined();
  });
});
