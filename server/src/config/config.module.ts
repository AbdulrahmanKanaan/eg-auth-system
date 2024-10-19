import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import configSchema from './config.schema';

@Global()
@Module({
  imports: [NestConfigModule.forRoot({ validationSchema: configSchema })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
