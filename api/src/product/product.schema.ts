import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product{
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: string;
  @Prop({ required: true })
  description: string; 
} 

export const  ProductSChema  = SchemaFactory.createForClass(Product)