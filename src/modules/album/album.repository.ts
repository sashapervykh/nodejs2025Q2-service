import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { Album } from './album.interface';

@Injectable()
export class AlbumRepository {
  findAllAlbums() {
    return database.albums;
  }

  // getArtistById(id: string) {
  //   return database.artists.find((elem) => elem.id === id);
  // }

  createAlbum(album: Album) {
    database.albums.push(album);
  }

  // deleteArtist(id: string) {
  //   database.artists = database.artists.filter((elem) => elem.id !== id);
  // }

  // updateArtist(artist: Artist) {
  //   const oldArtist = this.getArtistById(artist.id);
  //   oldArtist.name = artist.name;
  //   oldArtist.grammy = artist.grammy;
  // }
}
