import {
  CanActivate,
  ExecutionContext,
  Inject,
  HttpStatus,
} from '@nestjs/common';

import AppError from '@common/erros/AppError';

import InvestmentRepository from '@modules/investment/repository/InvestmentRepository';

class InvestmentGuard implements CanActivate {
  constructor(
    @Inject(InvestmentRepository)
    private investmentRepository: InvestmentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    const investmentRecord = request.params.investment
      ? await this.investmentRepository.get({
          id: Number(request.params.investment),
        })
      : null;

    if (!user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (investmentRecord && investmentRecord.user !== user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }
}

export default InvestmentGuard;
