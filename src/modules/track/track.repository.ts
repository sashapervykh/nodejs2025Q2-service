import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { Track } from './track.interface';

@Injectable()
export class TrackRepository {
  findAllTracks() {
    return database.tracks;
  }

  // getAlbumById(id: string) {
  //   return database.albums.find((elem) => elem.id === id);
  // }

  createTrack(track: Track) {
    database.tracks.push(track);
  }

  // deleteAlbum(id: string) {
  //   database.albums = database.albums.filter((elem) => elem.id !== id);
  // }

  // updateAlbum(album: Album) {
  //   const oldAlbum = this.getAlbumById(album.id);
  //   oldAlbum.name = album.name;
  //   oldAlbum.year = album.year;
  //   oldAlbum.artistId = album.artistId;
  // }
}
