import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    throw new Error(`error in auth`);

    console.log(`AuthGuard invoked`);
    console.log(`Checking API key...`);
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if (apiKey !== `BondJamesBond`) {
      console.log(`Invalid API key: ${apiKey}`);
      return false;
    }
    console.log(`Valid API key: ${apiKey}`);
    return true;
  }
}
