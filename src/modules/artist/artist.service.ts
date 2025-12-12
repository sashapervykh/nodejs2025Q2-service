import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private readonly repository: Repository<Artist>,
  ) {}

  getAllArtists() {
    return this.repository.find();
  }

  async getArtistById(id: string) {
    const artist = await this.repository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundError('artist');
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const createdArtist = await this.repository.save(createArtistDto);
    return createdArtist;
  }

  async deleteArtist(id: string) {
    const artist = await this.repository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundError('artist');
    await this.repository.delete(id);
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.repository.findOne({ where: { id } });
    if (!artist) throw new CustomNotFoundError('artist');
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    const updatedArtist = await this.repository.save(artist);
    return updatedArtist;
  }
}
