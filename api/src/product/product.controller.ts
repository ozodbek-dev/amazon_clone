import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Product creator endpoint
  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ) {
    return this.productService.create(name, price, description);
  }

  //Getter endpoint to get All products;
  @Get()
  getAllProducts(): Promise<ProductDocument[]> {
    return this.productService.getAllProducts();
  }

  //Getter endpoint to get single product by id;
  @UseGuards(JwtGuard)
  @Get(':id')
  getProdocutById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.getProductById(id);
  }

  // Updater endpoint to update product by id;
  @Put(':id')
  updateProductById(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('price') price?: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.update(id, name, price, description);
  }

  // Delete endpoint
  @Delete(':id')
  deleteProductById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.delete(id);
  }
}
