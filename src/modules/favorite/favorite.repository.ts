import { Injectable } from '@nestjs/common';
import { CustomUnprocessableEntityError } from 'src/common/utils/customErrors';
import { database } from 'src/database/database';

@Injectable()
export class FavRepository {
  findAllFavs() {
    return database.favs;
  }

  addFavTrack(id: string) {
    if (database.favs.tracks.some((elem) => elem.id === id)) {
      return;
    }
    const track = database.tracks.find((elem) => elem.id === id);
    if (!track) throw new CustomUnprocessableEntityError('track');
    database.favs.tracks.push(track);
  }

  addFavArtist(id: string) {
    if (database.favs.artists.some((elem) => elem.id === id)) {
      return;
    }
    const artist = database.artists.find((elem) => elem.id === id);
    if (!artist) throw new CustomUnprocessableEntityError('artist');
    database.favs.artists.push(artist);
  }

  addFavAlbum(id: string) {
    if (database.favs.albums.some((elem) => elem.id === id)) {
      return;
    }
    const album = database.albums.find((elem) => elem.id === id);
    if (!album) throw new CustomUnprocessableEntityError('album');
    database.favs.albums.push(album);
  }
}
