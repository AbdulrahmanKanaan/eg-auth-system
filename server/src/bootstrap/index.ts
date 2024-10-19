import { INestApplication } from '@nestjs/common';
import { Bootstrap } from './bootstrap';
import { CorsBootstrap } from './cors.bootstrap';
import { ListenBootstrap } from './listen.bootstrap';
import { SwaggerBootstrap } from './swagger.bootstrap';
import { ValidationBootstrap } from './validation.bootstrap';

interface BootstrapConstructor {
  new (app: INestApplication): Bootstrap;
}

// Must be in order
export default [
  CorsBootstrap,
  ValidationBootstrap,
  SwaggerBootstrap,
  ListenBootstrap,
] as BootstrapConstructor[];
