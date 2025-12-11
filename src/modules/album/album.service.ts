import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly repository: Repository<Album>,
  ) {}

  getAllAlbums() {
    return this.repository.find();
  }

  async getAlbumById(id: string) {
    const album = await this.repository.findOne({ where: { id } });
    if (!album) throw new CustomNotFoundError('album');
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.repository.save(createAlbumDto);
    return createdAlbum;
  }

  async deleteAlbum(id: string) {
    const album = await this.repository.findOne({ where: { id } });
    if (!album) throw new CustomNotFoundError('album');
    await this.repository.delete(id);
  }

  async updateAlbum(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = await this.repository.findOne({ where: { id } });
    if (!album) throw new CustomNotFoundError('album');
    album.name = updateArtistDto.name;
    album.year = updateArtistDto.year;
    album.artistId = updateArtistDto.artistId;
    const updatedAlbum = this.repository.save(album);
    return updatedAlbum;
  }
}
