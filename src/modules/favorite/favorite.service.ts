// import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { FavRepository } from './favorite.repository';
// import { CreateArtistDto, UpdateArtistDto } from './favorite.dto';
// import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class FavService {
  constructor(private readonly repository: FavRepository) {}

  getAllFavs() {
    return this.repository.findAllFavs();
  }

  addFavTrack(id: string) {
    this.repository.addFavTrack(id);
  }

  addFavArtist(id: string) {
    this.repository.addFavArtist(id);
  }

  addFavAlbum(id: string) {
    this.repository.addFavAlbum(id);
  }
}
