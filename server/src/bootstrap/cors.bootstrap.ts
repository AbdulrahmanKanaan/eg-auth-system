import { Bootstrap } from './bootstrap';

export class CorsBootstrap extends Bootstrap {
  public async run(): Promise<void> {
    this.app.enableCors({ origin: '*' });
  }
}
