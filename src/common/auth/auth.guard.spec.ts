import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it(`should return true if there is a valid API key`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: (headerName: string) => {
            if (headerName === 'x-api-key') {
              return 'BondJamesBond';
            }
            return null;
          },
          headers: { 'x-api-key': 'BondJamesBond' },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });
  it(`should return false if there is no header is passed in`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => undefined,
          headers: { 'x-api-key': undefined },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
  it(`should return false if the API key is invalid`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => 'invalid-api-key',
          headers: { 'x-api-key': 'invalid-api-key' },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
