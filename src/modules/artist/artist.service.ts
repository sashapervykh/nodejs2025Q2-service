import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './artist.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class ArtistService {
  constructor(private readonly repository: ArtistRepository) {}

  getAllArtists() {
    return this.repository.findAllArtists();
  }

  getArtistById(id: string) {
    const artist = this.repository.getArtistById(id);
    if (!artist) throw new CustomNotFoundError('artist');
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const uuid = randomUUID();
    const artist = {
      id: uuid,
      ...createArtistDto,
    };
    this.repository.createArtist(artist);
    return artist;
  }

  deleteArtist(id: string) {
    const artist = this.repository.getArtistById(id);
    if (!artist) throw new CustomNotFoundError('artist');
    this.repository.deleteArtist(id);
  }

  // updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   const user = this.repository.getUserById(id);
  //   if (!user) throw new CustomNotFoundError('user');
  //   if (user.password !== updatePasswordDto.oldPassword) {
  //     throw new CustomNotAuthorizedError();
  //   }
  //   user.password = updatePasswordDto.newPassword;
  //   user.version++;
  //   user.updatedAt = Date.now();

  //   this.repository.updatePassword(user);
  //   return this.getUserWithoutPassword(user);
  // }

  // private getUserWithoutPassword(user: User) {
  //   return {
  //     id: user.id,
  //     login: user.login,
  //     createdAt: user.createdAt,
  //     updatedAt: user.updatedAt,
  //     version: user.version,
  //   };
  // }
}
