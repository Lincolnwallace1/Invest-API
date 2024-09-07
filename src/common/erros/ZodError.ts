import { HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

import AppError from './AppError';

class ValidationError extends AppError {
  constructor(error: ZodError) {
    super({
      name: 'Body validation error',
      statusCode: HttpStatus.BAD_REQUEST,
      data: error.errors,
    });
  }
}

export default ValidationError;
