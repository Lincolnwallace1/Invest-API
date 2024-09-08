import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Investment from '@entities/Investment';

import {
  ICreateInvestmentDTO,
  IUpdateInvestmentDTO,
} from '@modules/investment/dtos';

@Injectable()
class InvestmentRepository {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  public async create(data: ICreateInvestmentDTO): Promise<Investment> {
    return await this.investmentRepository.save(data);
  }

  public async update(id: number, data: IUpdateInvestmentDTO): Promise<void> {
    await this.investmentRepository.update(id, {
      ...data,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<Investment> {
    return await this.investmentRepository.findOne({
      where,
      relations,
    });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Investment[], number]> {
    return this.investmentRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }

  public async paymentList(): Promise<Investment[]> {
    const investments = await this.investmentRepository
      .createQueryBuilder('investment')
      .where(
        "DATE_PART('day', investment.initialDate) = DATE_PART('day', CURRENT_TIMESTAMP) AND investment.status = 'active'",
        { date: new Date() },
      )
      .getMany();

    return investments;
  }
}

export default InvestmentRepository;
