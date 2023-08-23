import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { compareHashPassword } from 'src/utils/password-hash';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (!user) {
      return 'Invalid User Name';
    }

    const isMatch = compareHashPassword(loginDto.password, user.password);

    if (!isMatch) {
      return 'Invalid Password';
    }

    return 'Login successful';
  }

  // async register(loginDto: LoginDto) {
  //   const { password, username } = loginDto;
  //   const user = await this.userModel.findOne({
  //     username: loginDto.username,
  //   });

  //   if (user) {
  //     return 'User already exists';
  //   }

  //   const hashedPassword = generateHashPassword(password);

  //   const hash = await this.userModel.create({
  //     username,
  //     password: hashedPassword,
  //   });

  //   return 'User created';
  // }
}
