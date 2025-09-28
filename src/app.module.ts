import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

import { Product } from './modules/products/entities/product.entity';
import { ProductImage } from './modules/product-images/entities/product-image.entity';
import { Size } from './modules/sizes/entities/size.entity';
import { OrderEntity } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { ProductImagesModule } from './modules/product-images/product-images.module';
import { AuditModule } from './modules/audit/audit.module';
import { AuditEntity } from './modules/audit/entity';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
@Module({
  imports: [
    // 1) تحميل المتغيرات من .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2) TypeORM Config
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
        entities: [
          Product,
          ProductImage,
          Size,
          OrderEntity,
          OrderItem,
          AuditEntity,
          UserEntity,
        ],
        synchronize: true,
      }),
    }),

    // 3) EventEmitter - عشان الـ audit events
    EventEmitterModule.forRoot(),

    // 4) Modules
    ProductsModule,
    OrdersModule,
    ProductImagesModule,
    AuditModule,
    UsersModule,
    // UsersModule, (لو عندك)
  ],
})
export class AppModule {}
