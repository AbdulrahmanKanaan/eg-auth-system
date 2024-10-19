import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(user: UserService.CreateUser): Promise<UserDocument> {
    // Check if user with provided email already exists
    let userDocument: UserDocument = await this.userModel.findOne({
      email: user.email,
    });

    // If user with provided email already exists, throw an error
    if (userDocument) {
      throw new ConflictException('user with provided email already exists!');
    }

    // Create a new user document
    userDocument = await this.userModel.create(user);

    return userDocument;
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    // Find user document with provided email
    const userDocument: UserDocument = await this.userModel.findOne({
      email,
    });

    // If user with provided email not found, throw an error
    if (!userDocument) {
      throw new NotFoundException('user with provided email not found!');
    }

    return userDocument;
  }
}

export namespace UserService {
  export interface CreateUser {
    name: string;
    email: string;
    password: string;
  }
}
