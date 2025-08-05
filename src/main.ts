import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تفعيل الفاليديشن على مستوى التطبيق كله
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.POSTGRES_PORT ?? 5000);
}
void bootstrap();
