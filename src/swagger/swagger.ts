import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerDocs } from './index';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('ChatGPT API 문서')
    .setDescription('ChatGPT와 연동된 API에 대한 문서입니다.')
    .setVersion('1.0')
    .build();

  const document = {
    openapi: '3.0.0',
    info: config,
    paths: swaggerDocs.paths,
  };

  SwaggerModule.setup('api-docs', app, document as any);
}
