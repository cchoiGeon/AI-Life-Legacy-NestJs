import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerDocs } from './index.swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('AI 자서전 API 문서')
    .setDescription('AI 자서전 서비스에 관련된 문서입니다.')
    .setVersion('1.0')
    .build();

  const document = {
    openapi: '3.0.0',
    info: config,
    paths: swaggerDocs.paths,
  };

  SwaggerModule.setup('api-docs', app, document as any);
}
