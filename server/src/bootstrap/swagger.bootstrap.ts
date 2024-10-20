import { INestApplication } from '@nestjs/common';
import { Bootstrap } from './bootstrap';
import { ConfigService } from 'src/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerBootstrap extends Bootstrap {
  private readonly configService: ConfigService;

  constructor(app: INestApplication) {
    super(app);
    this.configService = app.get<ConfigService>(ConfigService);
  }

  public async run(): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle('Auth System')
      .setDescription('An authentication system')
      .setVersion('1.0')
      .addSecurity('user', {
        scheme: 'bearer',
        type: 'http',
      })
      .build();

    const documentFactory = () =>
      SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup('api-docs', this.app, documentFactory);
  }
}
