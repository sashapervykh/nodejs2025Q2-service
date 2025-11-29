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
    database.favs.tracks = database.favs.tracks.filter(
      (elem) => elem.id !== id,
    );
  }

  updateTrack(track: Track) {
    const oldTrack = this.getTrackById(track.id);
    oldTrack.name = track.name;
    oldTrack.duration = track.duration;
    oldTrack.artistId = track.artistId;
    oldTrack.albumId = track.albumId;
  }
}
