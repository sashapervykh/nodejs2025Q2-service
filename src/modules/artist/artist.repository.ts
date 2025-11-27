import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';

@Injectable()
export class ArtistRepository {
  findAllArtists() {
    return database.artists;
  }

  // getUserById(id: string) {
  //   return database.users.find((elem) => elem.id === id);
  // }

  // createUser(user: User) {
  //   database.users.push(user);
  // }

  // deleteUser(id: string) {
  //   database.users = database.users.filter((elem) => elem.id !== id);
  // }

  // updatePassword(user: User) {
  //   const oldUser = this.getUserById(user.id);
  //   oldUser.password = user.id;
  //   oldUser.version = user.version;
  //   oldUser.updatedAt = user.updatedAt;
  // }
}
