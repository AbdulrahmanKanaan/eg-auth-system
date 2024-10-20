import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bootstraps from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  for (const bs of bootstraps) {
    await new bs(app).run();
  }

  return app;
}

bootstrap().then(afterBootstrap).catch(console.log);

async function afterBootstrap(app: INestApplication) {
  console.log(`Server running on ${await app.getUrl()}`);
}
