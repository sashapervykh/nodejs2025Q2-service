import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ login, password }: SignInDto) {
    const user = await this.usersService.getUserByName(login);
    if (!user) {
      throw new ForbiddenException('User with this login is not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong password');
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async signUp({ login, password }: SignUpDto) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.CRYPT_SALT),
    );
    const createdUser = await this.usersService.createUser({
      login,
      password: hashedPassword,
    });

    return createdUser;
  }

  async refresh({ refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const newAccessToken = await this.jwtService.signAsync({
        userId: payload.userId,
        login: payload.login,
      });

      const newRefreshToken = await this.jwtService.signAsync(
        { userId: payload.userId, login: payload.login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
