import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from './user.dto';
import {
  CustomNotAuthorizedError,
  CustomNotFoundError,
} from 'src/common/utils/customErrors';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.repository.find();
    return users.map((user) => this.getUserWithoutPassword(user));
  }

  async getUserById(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new CustomNotFoundError('user');
    return this.getUserWithoutPassword(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.repository.save(createUserDto);
    return this.getUserWithoutPassword(user);
  }

  async deleteUser(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new CustomNotFoundError('user');
    await this.repository.delete(id);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new CustomNotFoundError('user');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new CustomNotAuthorizedError();
    }
    user.password = updatePasswordDto.newPassword;
    const updated = await this.repository.save(user);
    return this.getUserWithoutPassword(updated);
  }

  private getUserWithoutPassword(user: User): UserResponseDto {
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
      version: user.version,
    };
  }
}
