import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
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

  updateAlbum(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.repository.getTrackById(id);
    if (!track) throw new CustomNotFoundError('track');

    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;

    this.repository.updateTrack(track);
    return track;
  }
}
