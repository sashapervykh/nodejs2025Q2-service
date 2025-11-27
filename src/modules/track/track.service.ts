import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './track.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class TrackService {
  constructor(private readonly repository: TrackRepository) {}

  getAllTracks() {
    return this.repository.findAllTracks();
  }

  getTrackById(id: string) {
    const track = this.repository.getTrackById(id);
    if (!track) throw new CustomNotFoundError('track');
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const uuid = randomUUID();
    const album = {
      id: uuid,
      ...createTrackDto,
    };
    this.repository.createTrack(album);
    return album;
  }

  deleteTrack(id: string) {
    const track = this.repository.getTrackById(id);
    if (!track) throw new CustomNotFoundError('track');
    this.repository.deleteTrack(id);
  }

  // updateAlbum(id: string, updateArtistDto: UpdateAlbumDto) {
  //   const album = this.repository.getAlbumById(id);
  //   if (!album) throw new CustomNotFoundError('album');

  //   album.name = updateArtistDto.name;
  //   album.year = updateArtistDto.year;
  //   album.artistId = updateArtistDto.artistId;

  //   this.repository.updateAlbum(album);
  //   return album;
  // }
}
