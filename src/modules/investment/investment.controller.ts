import {
  Controller,
  Body,
  Req,
  Post,
  HttpStatus,
  Get,
  Param,
  Patch,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/erros/ZodError';

import AuthGuard from '@common/middlewares/AuthMiddleware/auth.guard';

import {
  CreateInvestmentSchema,
  WithdrawInvestmentSchema,
  ListInvestmentSchema,
} from './schemas';

import {
  ICreateInvestment,
  ICreateInvestmentResponse,
  IGetInvestmentResponse,
  IListInvestment,
  IListInvestmentResponse,
  IWithdrawInvestment,
  IWithdrawnInvestmentResponse,
} from './docs';

import {
  CreateInvestmentService,
  GetInvestmentService,
  WithdrawnInvestmentService,
  ListInvestmentService,
} from './useCases';

@ApiTags('Investments')
@ApiBearerAuth('Bearer')
@Controller('investments')
class InvestmentController {
  constructor(
    private readonly createInvestmentService: CreateInvestmentService,
    private readonly getInvestmentService: GetInvestmentService,
    private readonly listInvestmentService: ListInvestmentService,
    private readonly withdrawnInvestmentService: WithdrawnInvestmentService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new investment' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: ICreateInvestment,
  })
  @ApiResponse({
    description: 'Investment Created',
    type: ICreateInvestmentResponse,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Post('/')
  public async createInvestment(
    @Body() data: ICreateInvestment,
    @Req() req: Request,
  ): Promise<ICreateInvestmentResponse> {
    const dataParsed = await CreateInvestmentSchema.parseAsync(data).catch(
      (err) => {
        throw new ValidationError(err.errors);
      },
    );

    const investment = await this.createInvestmentService.execute({
      data: dataParsed,
      user: req['user'],
    });

    return {
      id: investment.id,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a investment' })
  @ApiResponse({
    description: 'Investment',
    type: IGetInvestmentResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Investment Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/:investment')
  public async getInvestment(
    @Param('investment') investment: string,
  ): Promise<IGetInvestmentResponse> {
    const investmentRecord = await this.getInvestmentService.execute({
      investment: Number(investment),
    });

    return instanceToInstance(investmentRecord);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List investments' })
  @ApiResponse({
    description: 'Investments',
    type: IListInvestmentResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Post('/list')
  public async listInvestment(
    @Body() data: IListInvestment,
    @Req() req: Request,
  ): Promise<IListInvestmentResponse> {
    const dataParsed = await ListInvestmentSchema.parseAsync(data).catch(
      (err) => {
        throw new ValidationError(err.errors);
      },
    );

    const investments = await this.listInvestmentService.execute({
      data: dataParsed,
      user: req['user'],
    });

    return instanceToInstance(investments);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Withdraw investment' })
  @ApiResponse({
    description: 'Investment withdrawn',
    type: IWithdrawnInvestmentResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'Investment Not Found',
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('/:investment/withdraw')
  public async withdrawnInvestment(
    @Param('investment') investment: string,
    @Body() data: IWithdrawInvestment,
  ): Promise<IWithdrawnInvestmentResponse> {
    const dataParsed = await WithdrawInvestmentSchema.parseAsync(data).catch(
      (err) => {
        throw new ValidationError(err.errors);
      },
    );

    const investmentRecord = await this.withdrawnInvestmentService.execute({
      investment: Number(investment),
      data: dataParsed,
    });

    return instanceToInstance(investmentRecord);
  }
}

export default InvestmentController;
