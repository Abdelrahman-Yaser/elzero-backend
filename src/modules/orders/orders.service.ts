import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(private readonly dataSource: DataSource) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    return await this.dataSource.transaction(async (manager) => {
      // 1- إنشاء الأوردر نفسه
      const order = manager.create(OrderEntity, {
        ...createOrderDto,
        items: undefined, // عشان items هنعملها تحت
      });
      await manager.save(order);

      // 2- معالجة المنتجات اللي في الأوردر
      for (const item of createOrderDto.items) {
        const product = await manager.findOne(Product, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Not enough stock for product ${product.id}`,
          );
        }

        // تقليل الكمية
        product.stock -= item.quantity;
        await manager.save(product);

        // إنشاء orderItem وربطه بالأوردر
        const orderItem = manager.create(OrderItem, {
          order,
          product,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          quantity: item.quantity,
        });
        await manager.save(orderItem);
      }

      return order;
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
