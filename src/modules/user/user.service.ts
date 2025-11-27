import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { randomUUID } from 'node:crypto';
import { User } from './user.interface';
import {
  CustomNotAuthorizedError,
  CustomNotFoundError,
} from 'src/common/utils/customErrors';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  getAllUsers() {
    return this.repository
      .findAllUsers()
      .map((user) => this.getUserWithoutPassword(user));
  }

  getUserById(id: string) {
    const user = this.repository.getUserById(id);
    if (!user) throw new CustomNotFoundError('user');
    return this.getUserWithoutPassword(user);
  }

  createUser(createUserDto: CreateUserDto) {
    const createdAt = Date.now();
    const uuid = randomUUID();
    const user = {
      id: uuid,
      ...createUserDto,
      createdAt,
      updatedAt: createdAt,
      version: 1,
    };
    this.repository.createUser(user);
    return this.getUserWithoutPassword(user);
  }

  deleteUser(id: string) {
    const user = this.repository.getUserById(id);
    if (!user) throw new CustomNotFoundError('user');
    this.repository.deleteUser(id);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.repository.getUserById(id);
    if (!user) throw new CustomNotFoundError('user');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new CustomNotAuthorizedError();
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    this.repository.updatePassword(user);
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
