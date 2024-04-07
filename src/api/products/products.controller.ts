import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Path } from '../../decorator/path.decorator';
import { EntityRouteEnum } from '../../enums/entity.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { RoleGuard } from '../../guards/role/role.guard';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';

@Controller('products')
@Path(EntityRouteEnum.products)
@UseGuards(RoleGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(TransformResponseInterceptor)
  create(@Body() createProductDto: CreateProductDto): { message: string } {
    return { message: this.productsService.create(createProductDto) };
  }

  @Get()
  @UseInterceptors(TransformResponseInterceptor)
  findAll(): { message: string } {
    return { message: this.productsService.findAll() };
  }

  @Get(':id')
  @UseInterceptors(TransformResponseInterceptor)
  findOne(@Param('id') id: string): { message: string } {
    return { message: this.productsService.findOne(+id) };
  }

  @Patch(':id')
  @UseInterceptors(TransformResponseInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): { message: string } {
    return { message: this.productsService.update(+id, updateProductDto) };
  }

  @Delete(':id')
  @UseInterceptors(TransformResponseInterceptor)
  remove(@Param('id') id: string): { message: string } {
    return { message: this.productsService.remove(+id) };
  }
}
