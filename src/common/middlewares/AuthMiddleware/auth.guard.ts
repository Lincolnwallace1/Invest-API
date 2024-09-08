import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import AppError from '@common/erros/AppError';

@Injectable()
class AuthGuard implements CanActivate {
  private jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('AUTH_ACCESS_TOKEN_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!request.headers.authorization) {
      throw new AppError({
        name: 'Missing Authorization Header',
        errorCode: 'missing_authorization_header',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (type !== 'Bearer') {
      throw new AppError({
        name: 'Invalid Authorization Header',
        errorCode: 'invalid_authorization_header',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (!token) {
      throw new AppError({
        name: 'Missing Authorization Header',
        errorCode: 'missing_authorization_header',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtSecret,
      });

      request['user'] = decoded.user;
    } catch (error) {
      throw new AppError({
        name: 'Invalid Token',
        errorCode: 'invalid_token',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }
}

export default AuthGuard;
