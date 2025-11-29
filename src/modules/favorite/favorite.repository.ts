import { Injectable } from '@nestjs/common';
import {
  CustomUnprocessableEntityError,
  FavsNotFoundError,
} from 'src/common/utils/customErrors';
import { database } from 'src/database/database';

@Injectable()
export class FavRepository {
  findAllFavs() {
    return database.favs;
  }

  addFavTrack(id: string) {
    if (database.favs.tracks.find((elem) => elem.id === id)) {
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

  deleteFavTrack(id: string) {
    if (!database.favs.tracks.find((elem) => elem.id === id)) {
      throw new FavsNotFoundError('track');
    }

    database.favs.tracks = database.favs.tracks.filter(
      (elem) => elem.id !== id,
    );
  }

  deleteFavArtist(id: string) {
    if (!database.favs.artists.find((elem) => elem.id === id)) {
      throw new FavsNotFoundError('artist');
    }

    database.favs.artists = database.favs.artists.filter(
      (elem) => elem.id !== id,
    );
  }

  deleteFavAlbum(id: string) {
    if (!database.favs.albums.find((elem) => elem.id === id)) {
      throw new FavsNotFoundError('album');
    }

    database.favs.albums = database.favs.albums.filter(
      (elem) => elem.id !== id,
    );
  }
}
