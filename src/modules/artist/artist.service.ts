import { randomUUID } from 'node:crypto';
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

  getArtistById(id: string) {
    // const artist = this.repository.getArtistById(id);
    // if (!artist) throw new CustomNotFoundError('artist');
    // return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    // const uuid = randomUUID();
    // const artist = {
    //   id: uuid,
    //   ...createArtistDto,
    // };
    // this.repository.createArtist(artist);
    // return artist;
  }

  deleteArtist(id: string) {
    // const artist = this.repository.getArtistById(id);
    // if (!artist) throw new CustomNotFoundError('artist');
    // this.repository.deleteArtist(id);
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    //   const artist = this.repository.getArtistById(id);
    //   if (!artist) throw new CustomNotFoundError('artist');
    //   artist.name = updateArtistDto.name;
    //   artist.grammy = updateArtistDto.grammy;
    //   this.repository.updateArtist(artist);
    //   return artist;
  }
}
