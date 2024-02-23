import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!(await compare(loginAuthDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      token: this.jwtService.sign(
        { userName: loginAuthDto.email },
        { subject: user.id, secret: process.env.SECRET_KEY },
      ),
      user: user,
    };
  }
}
