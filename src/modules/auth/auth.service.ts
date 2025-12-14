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
    const hashedPassword = await bcrypt.hash(password, process.env.CRYPT_SALT);
    const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong password');
    }

    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async signUp({ login, password }: SignUpDto) {
    const user = await this.usersService.getUserByName(login);
    if (user) {
      throw new BadRequestException('The user with this login already exists');
    }

    const hashedPassword = await bcrypt.hash(password, process.env.CRYPT_SALT);
    this.usersService.createUser({ login, password: hashedPassword });

    return { message: 'The user is created' };
  }

  async refresh({ refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, username: payload.username },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { sub: payload.sub, username: payload.username },
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
