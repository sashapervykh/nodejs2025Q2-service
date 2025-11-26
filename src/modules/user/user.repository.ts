import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  findAllUsers() {
    return database.users;
  }

  createUser(user: User) {
    database.users.push(user);
  }
}
