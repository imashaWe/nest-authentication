import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private usrModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    const user = await this.usrModel.findOne({
      username: loginDto.username,
    });

    if (!user) {
      return 'Invalid User Name';
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      return 'Invalid Password';
    }

    return 'Login successful';
  }

  async register(loginDto: LoginDto) {
    const { password, username } = loginDto;
    const user = await this.usrModel.findOne({
      username: loginDto.username,
    });

    if (user) {
      return 'User already exists';
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    await this.usrModel.create({
      username,
      password: hash,
    });

    return 'User created';
  }
}
