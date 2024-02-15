import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  providers: [AuthService,UsersService, JwtService, PrismaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
