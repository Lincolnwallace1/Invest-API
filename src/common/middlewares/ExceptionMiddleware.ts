import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import AppError from '@common/erros/AppError';

@Catch()
class ExceptionMiddleware implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        status: 'error',
        message: exception.name,
        code: exception.errorCode,
        statusCodes: exception.statusCode,
        data: exception.data,
      });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as string | { message: string })
        : 'Internal Server Error';

    return response.status(status).json({
      status: 'error',
      message,
    });
  }
}

export default ExceptionMiddleware;
