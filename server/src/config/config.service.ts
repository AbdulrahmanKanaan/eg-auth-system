import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  public port(): number {
    return this.configService.get<number>('PORT');
  }

  public jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  public dbUrl(): string {
    return this.configService.get<string>('DB_URL');
  }
}
