import { INestApplication } from '@nestjs/common';

export abstract class Bootstrap {
  protected app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  public abstract run(): Promise<void>;
}
