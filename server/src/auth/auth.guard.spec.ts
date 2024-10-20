import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let executionContext: ExecutionContext;

  beforeEach(async () => {
    authService = createMock<AuthService>();
    guard = new AuthGuard(authService);
    const switchToHttpMock = createMock();
    executionContext = createMock<ExecutionContext>({
      switchToHttp: () => switchToHttpMock,
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the token is valid', async () => {
    // Arrange
    const mockToken = 'valid.token.here';
    const mockPayload = { sub: 'userId' };
    const mockRequest = { headers: { authorization: `Bearer ${mockToken}` } };

    jest.spyOn(authService, 'verifyToken').mockResolvedValue(mockPayload);

    jest
      .spyOn(executionContext.switchToHttp(), 'getRequest')
      .mockReturnValue(mockRequest);

    // Act
    const result = guard.canActivate(executionContext);

    // Assert
    await expect(result).resolves.toBe(true);
    await expect(authService.verifyToken).toHaveBeenCalledWith(mockToken);
  });

  it('should throw UnauthorizedException if the token is invalid', async () => {
    // Arrange
    const mockToken = 'invalid.token.here';
    const mockRequest = { headers: { authorization: `Bearer ${mockToken}` } };

    jest.spyOn(authService, 'verifyToken').mockRejectedValue(new Error());

    jest
      .spyOn(executionContext.switchToHttp(), 'getRequest')
      .mockReturnValue(mockRequest);

    // Act
    const result = guard.canActivate(executionContext);

    // Assert
    await expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    // Arrange
    const mockRequest = { headers: {} };

    jest
      .spyOn(executionContext.switchToHttp(), 'getRequest')
      .mockReturnValue(mockRequest);

    // Act
    const result = guard.canActivate(executionContext);

    // Assert
    await expect(result).rejects.toThrow(UnauthorizedException);
  });
});
