import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './album.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class AlbumService {
  constructor(private readonly repository: AlbumRepository) {}

  getAllAlbums() {
    return this.repository.findAllAlbums();
  }

  getAlbumById(id: string) {
    const artist = this.repository.getAlbumById(id);
    if (!artist) throw new CustomNotFoundError('album');
    return artist;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const uuid = randomUUID();
    const album = {
      id: uuid,
      ...createAlbumDto,
    };
    this.repository.createAlbum(album);
    return album;
  }

  deleteAlbum(id: string) {
    const artist = this.repository.getAlbumById(id);
    if (!artist) throw new CustomNotFoundError('album');
    this.repository.deleteAlbum(id);
  }

  // updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
  //   const artist = this.repository.getArtistById(id);
  //   if (!artist) throw new CustomNotFoundError('artist');

  //   artist.name = updateArtistDto.name;
  //   artist.grammy = updateArtistDto.grammy;

  //   this.repository.updateArtist(artist);
  //   return artist;
  // }
}
