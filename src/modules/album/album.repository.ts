import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { Album } from './album.interface';

@Injectable()
export class AlbumRepository {
  findAllAlbums() {
    return database.albums;
  }

  getAlbumById(id: string) {
    return database.albums.find((elem) => elem.id === id);
  }

  createAlbum(album: Album) {
    database.albums.push(album);
  }

  deleteAlbum(id: string) {
    database.albums = database.albums.filter((elem) => elem.id !== id);
  }

  // updateArtist(artist: Artist) {
  //   const oldArtist = this.getArtistById(artist.id);
  //   oldArtist.name = artist.name;
  //   oldArtist.grammy = artist.grammy;
  // }
}
