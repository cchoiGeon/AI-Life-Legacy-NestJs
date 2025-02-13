import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipe/validationPipe.pipe';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());
    // CORS 활성화
    // app.enableCors({
    //   origin: '*', // 허용할 도메인
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   credentials: true, 
    // });
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
