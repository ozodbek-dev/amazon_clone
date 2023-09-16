import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // Product creator service;
  async create(
    name: string,
    price: number,
    description?: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({
      name,
      price,
      description,
    });
    return newProduct.save();
  }

  //Getter Service For All Products
  async getAllProducts(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  //Getter Service For single product by id
  async getProductById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  // Update Product
  async update(
    id: string,
    name?: string,
    price?: number,
    description?: string,
  ): Promise<ProductDocument> {
    return this.productModel
      .findByIdAndUpdate(id, { name, price, description }, { new: true })
      .exec();
  }

  // Delete Product
  async delete(id: string): Promise<ProductDocument> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
