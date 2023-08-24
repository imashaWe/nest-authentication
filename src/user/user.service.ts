import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import {
  compareHashPassword,
  generateHashPassword,
} from 'src/utils/password-hash';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUser(username: string, password: string) {
    const user = await this.userModel.findOne({
      username: username,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid User Name');
    }

    const isMatch = compareHashPassword(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;

    const user = await this.userModel.findOne({
      username: username,
    });

    if (user) {
      return 'User already exists';
    }

    const hashedPassword = generateHashPassword(password);

    await this.userModel.create({
      username,
      password: hashedPassword,
    });

    return 'User created';
  }
}
