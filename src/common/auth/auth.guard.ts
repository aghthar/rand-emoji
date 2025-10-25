import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // throw new UnauthorizedException();
    // throw new Error(`error in auth`);
    this.logger.info(`AuthGuard invoked`);
    this.logger.info(`Checking API key...`);
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if (apiKey !== `BondJamesBond`) {
      this.logger.error(`Invalid API key: ${apiKey}`);
      return false;
    }
    this.logger.info(`Valid API key: ${apiKey}`);
    return true;
  }
}
