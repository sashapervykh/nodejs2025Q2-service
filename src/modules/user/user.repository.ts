import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';

@Injectable()
export class UserRepository {
  findAllUsers() {
    return database.users;
  }
}
