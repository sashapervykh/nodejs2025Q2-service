import { User } from 'src/modules/user/user.interface';

export class Database {
  users: User[] = [];
  favorites: User[] = [];
  albums: User[] = [];
  artists: User[] = [];
  tracks: User[] = [];
}

export const database = new Database();
