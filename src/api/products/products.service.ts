import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'Product added successfully';
  }

  findAll() {
    return 'Products sent successfully';
  }

  findOne(id: number) {
    return 'Products sent successfully';
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return 'Products deleted successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
