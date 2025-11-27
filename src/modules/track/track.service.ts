import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './track.dto';
// import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class TrackService {
  constructor(private readonly repository: TrackRepository) {}

  getAllTracks() {
    return this.repository.findAllTracks();
  }

  // getAlbumById(id: string) {
  //   const album = this.repository.getAlbumById(id);
  //   if (!album) throw new CustomNotFoundError('album');
  //   return album;
  // }

  createTrack(createTrackDto: CreateTrackDto) {
    const uuid = randomUUID();
    const album = {
      id: uuid,
      ...createTrackDto,
    };
    this.repository.createTrack(album);
    return album;
  }

  // deleteAlbum(id: string) {
  //   const album = this.repository.getAlbumById(id);
  //   if (!album) throw new CustomNotFoundError('album');
  //   this.repository.deleteAlbum(id);
  // }

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
