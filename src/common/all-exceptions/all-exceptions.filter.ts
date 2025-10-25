import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.json({
      message: `TODO`,
      statusCode: `TODO`,
      timestamp: new Date().toISOString(),
      path: `TODO`,
    });
  }
}
