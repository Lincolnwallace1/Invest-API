import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  Param,
  Patch,
  HttpCode,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/erros/ZodError';

import {
  CreateInvestmentSchema,
  UpdateInvestmentSchema,
  ListInvestmentSchema,
} from './schemas';

import {
  ICreateInvestment,
  ICreateInvestmentResponse,
  IUpdateInvestment,
  IListInvestment,
  IListInvestmentResponse,
} from './docs';

@Controller('investment')
export class InvestmentController {}
