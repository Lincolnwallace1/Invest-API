import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import ValidationError from '@common/erros/ZodError';

import { ILogin, ILoginResponse } from './docs';

import { LoginSchema } from './schemas';

import { LoginService } from './useCases';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: ILogin,
  })
  @ApiResponse({
    description: 'User Logged',
    type: ILoginResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @Post('/')
  public async login(@Body() data: ILogin): Promise<ILoginResponse> {
    const dataParsed = await LoginSchema.parseAsync(data).catch((error) => {
      throw new ValidationError(error.errors);
    });

    const response = await this.loginService.execute({ data: dataParsed });

    return response;
  }
}

export default AuthController;
