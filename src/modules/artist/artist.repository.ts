import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistRepository {
  findAllArtists() {
    return database.artists;
  }

  getArtistById(id: string) {
    return database.artists.find((elem) => elem.id === id);
  }

  createArtist(artist: Artist) {
    database.artists.push(artist);
  }

  deleteArtist(id: string) {
    database.artists = database.artists.filter((elem) => elem.id !== id);
  }

  updateArtist(artist: Artist) {
    const oldArtist = this.getArtistById(artist.id);
    oldArtist.name = artist.name;
    oldArtist.grammy = artist.grammy;
  }
}
