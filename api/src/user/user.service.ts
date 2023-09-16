import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec()
    if (!user) return null;
    return this._getUserDetails(user);
  }
  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDocument> {
    return this.userModel.create({
      name,
      password,
      email,
    });
  }
}
