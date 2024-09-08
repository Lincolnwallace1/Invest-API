import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import History from '@entities/History';

import { ICreateHistoryDTO } from '@modules/history/dtos';

@Injectable()
class HistoryRepositorie {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  public async create(data: ICreateHistoryDTO): Promise<History> {
    return await this.historyRepository.save(data);
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[History[], number]> {
    return this.historyRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }
}

export default HistoryRepositorie;
