import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';
import { Track } from './track.interface';

@Injectable()
export class TrackRepository {
  findAllTracks() {
    return database.tracks;
  }

  getTrackById(id: string) {
    return database.tracks.find((elem) => elem.id === id);
  }

  createTrack(track: Track) {
    database.tracks.push(track);
  }

  deleteTrack(id: string) {
    database.tracks = database.tracks.filter((elem) => elem.id !== id);
  }

  // updateAlbum(album: Album) {
  //   const oldAlbum = this.getAlbumById(album.id);
  //   oldAlbum.name = album.name;
  //   oldAlbum.year = album.year;
  //   oldAlbum.artistId = album.artistId;
  // }
}
