import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSChema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Product", schema:ProductSChema}])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
