import { INestApplication } from '@nestjs/common';
import { Bootstrap } from './bootstrap';
import { ConfigService } from 'src/config';

export class ListenBootstrap extends Bootstrap {
  private readonly configService: ConfigService;

  constructor(app: INestApplication) {
    super(app);
    this.configService = app.get<ConfigService>(ConfigService);
  }

  public async run(): Promise<void> {
    const PORT = this.configService.port();
    await this.app.listen(PORT);
  }
}
