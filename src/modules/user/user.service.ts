import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto';
import { randomUUID } from 'node:crypto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  getAllUsers() {
    return this.repository
      .findAllUsers()
      .map((user) => this.getUserWithoutPassword(user));
  }

  createUser(createUserDto: CreateUserDto) {
    const createdAt = Date.now();
    const uuid = randomUUID();
    const user = {
      id: uuid,
      ...createUserDto,
      createdAt,
      updatedAt: 0,
      version: 1,
    };
    this.repository.createUser(user);
    return this.getUserWithoutPassword(user);
  }

  private getUserWithoutPassword(user: User) {
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }
}
