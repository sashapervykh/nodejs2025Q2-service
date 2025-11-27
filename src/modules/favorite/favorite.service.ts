// import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { FavRepository } from './favorite.repository';
// import { CreateArtistDto, UpdateArtistDto } from './favorite.dto';
// import { CustomNotFoundError } from 'src/common/utils/customErrors';

@Injectable()
export class FavService {
  constructor(private readonly repository: FavRepository) {}

  getAllFavs() {
    return this.repository.findAllFavs();
  }

  addFavTrack(id: string) {}
  // getArtistById(id: string) {
  //   const artist = this.repository.getArtistById(id);
  //   if (!artist) throw new CustomNotFoundError('artist');
  //   return artist;
  // }

  // createArtist(createArtistDto: CreateArtistDto) {
  //   const uuid = randomUUID();
  //   const artist = {
  //     id: uuid,
  //     ...createArtistDto,
  //   };
  //   this.repository.createArtist(artist);
  //   return artist;
  // }

  // deleteArtist(id: string) {
  //   const artist = this.repository.getArtistById(id);
  //   if (!artist) throw new CustomNotFoundError('artist');
  //   this.repository.deleteArtist(id);
  // }

  // updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
  //   const artist = this.repository.getArtistById(id);
  //   if (!artist) throw new CustomNotFoundError('artist');

  //   artist.name = updateArtistDto.name;
  //   artist.grammy = updateArtistDto.grammy;

  //   this.repository.updateArtist(artist);
  //   return artist;
  // }
}
