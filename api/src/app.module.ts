import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user/user.controller';

@Module({
  imports: [ProductModule, MongooseModule.forRoot("mongodb://localhost:27017/amazon"), UserModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
