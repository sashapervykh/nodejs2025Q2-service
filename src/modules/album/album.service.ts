import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class AlbumService {
  constructor(private readonly repository: AlbumRepository) {}

  getAllAlbums() {
    return this.repository.findAllAlbums();
  }

  getAlbumById(id: string) {
    const album = this.repository.getAlbumById(id);
    if (!album) throw new CustomNotFoundError('album');
    return album;
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
    const album = this.repository.getAlbumById(id);
    if (!album) throw new CustomNotFoundError('album');
    this.repository.deleteAlbum(id);
  }

  updateAlbum(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = this.repository.getAlbumById(id);
    if (!album) throw new CustomNotFoundError('album');

    album.name = updateArtistDto.name;
    album.year = updateArtistDto.year;
    album.artistId = updateArtistDto.artistId;

    this.repository.updateAlbum(album);
    return album;
  }
}
