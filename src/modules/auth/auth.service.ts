import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.getUserByName(signInDto.login);
    if (!user) {
      throw new ForbiddenException();
    }

    if (user.password !== signInDto.password) {
      throw new ForbiddenException();
    }

    return 'Signed In';
  }

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const user = await this.usersService.getUserByName(signUpDto.login);
    if (user) {
      throw new BadRequestException('The user with this login already exists');
    }

    this.usersService.createUser(signUpDto);

    return 'The user is created';
  }
}
