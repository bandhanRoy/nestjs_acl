import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '../../guards/role/role.guard';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('products');
  }
}
