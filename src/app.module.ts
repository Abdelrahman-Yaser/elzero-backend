import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1) تحميل المتغيرات من .env
    ConfigModule.forRoot({
      isGlobal: true, // عشان ConfigService يبقى متاح في كل الموديولات
      envFilePath: '.env', // مسار ملف البيئة
    }),

    // 2) إعداد TypeORM بشكلٍ غير متزامن ليستخدم ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // خليه false في الـ production
      }),
    }),

    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
