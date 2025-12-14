import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByName(signInDto.login);
    if (!user) {
      throw new ForbiddenException('User with this login is not found');
    }

    if (user.password !== signInDto.password) {
      throw new ForbiddenException('Wrong password');
    }

    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const user = await this.usersService.getUserByName(signUpDto.login);
    if (user) {
      throw new BadRequestException('The user with this login already exists');
    }

    this.usersService.createUser(signUpDto);

    return { message: 'The user is created' };
  }
}
