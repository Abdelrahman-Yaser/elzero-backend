import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يحذف القيم غير المعرفة في DTO
      forbidNonWhitelisted: true, // يرمي خطأ إذا أرسل المستخدم قيم غير مسموحة
      transform: true, // يحول القيم تلقائيًا للأنواع المحددة في DTO
    }),
  );

  await app.listen(9000);
}
void bootstrap();
