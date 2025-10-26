import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const switchToHttp = host.switchToHttp();
    const response = switchToHttp.getResponse<Response>();
    const request = switchToHttp.getRequest<Request>();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : 500;

    response.status(statusCode).json({
      message: isHttpException ? exception[`message`] : `Internal server error`,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
