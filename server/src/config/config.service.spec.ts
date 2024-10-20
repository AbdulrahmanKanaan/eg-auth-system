import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService as NestConfigService } from '@nestjs/config';

describe('ConfigService', () => {
  let service: ConfigService;
  let nestConfigService: NestConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ConfigService>(ConfigService);
    nestConfigService = module.get<NestConfigService>(NestConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the port', () => {
    // Arrange
    const expectedPort = 3000;

    jest.spyOn(nestConfigService, 'get').mockReturnValue(expectedPort);

    // Act
    const result = service.port();

    // Assert
    expect(result).toBe(expectedPort);
  });

  it('should return the jwt secret', () => {
    // Arrange
    const expectedJwt = 'jwt_secret';

    jest.spyOn(nestConfigService, 'get').mockReturnValue(expectedJwt);

    // Act
    const result = service.jwtSecret();

    // Assert
    expect(result).toBe(expectedJwt);
  });

  it('should return the db url', () => {
    // Arrange
    const expectedDbUrl = 'mongodb://localhost:27017/test';

    jest.spyOn(nestConfigService, 'get').mockReturnValue(expectedDbUrl);

    // Act
    const result = service.dbUrl();

    // Assert
    expect(result).toBe(expectedDbUrl);
  });
});
