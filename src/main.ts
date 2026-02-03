import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global API prefix
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
