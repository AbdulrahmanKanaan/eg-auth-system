import { ValidationPipe } from '@nestjs/common';
import { Bootstrap } from './bootstrap';

export class ValidationBootstrap extends Bootstrap {
  public async run(): Promise<void> {
    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));
  }
}
