import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.header(`user-agent`);
    const browserClient = userAgent ? userAgent : 'Unknown';
    request.headers.browser = browserClient;
    console.log(
      `Interceptor: manipulated request with new browser header: ${browserClient}`,
    );
    return next.handle();
  }
}
