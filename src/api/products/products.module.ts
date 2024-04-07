import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('products');
  }
}
