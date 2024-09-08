import { Test, TestingModule } from '@nestjs/testing';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

import { ListInvestmentService } from '@modules/investment/useCases';

describe('ListInvestmentService', () => {
  let service: ListInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            list: jest.fn().mockResolvedValueOnce([
              [
                {
                  id: 1,
                  user: 1,
                  name: 'Investment',
                  initialValue: 1000,
                  initialDate: new Date(),
                  status: 'active',
                  history: [],
                },
              ],
              1,
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<ListInvestmentService>(ListInvestmentService);
  });

  it('should call execute method', async () => {
    await service.execute({
      user: 1,
      data: {
        limit: 10,
        offset: 0,
      },
    });

    expect(service).toBeDefined();
  });
});
