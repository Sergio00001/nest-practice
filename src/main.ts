import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const {
    server: { port },
  } = new ConfigService();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  const configSwagger = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('The Tasks API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(port);
}
bootstrap();
