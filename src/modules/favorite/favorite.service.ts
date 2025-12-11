import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import {
  CustomUnprocessableEntityError,
  FavsNotFoundError,
} from 'src/common/utils/customErrors';

@Injectable()
export class FavService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favsRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  getAllFavs() {
    return this.getOrCreateFavorites();
  }

  async addFavTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomUnprocessableEntityError('track');
    const favs = await this.getOrCreateFavorites();
    if (!favs.tracks.some((elem) => elem.id === id)) {
      favs.tracks.push(track);
      await this.favsRepository.save(favs);
    }
  }

  async addFavArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new CustomUnprocessableEntityError('artist');
    const favs = await this.getOrCreateFavorites();
    if (!favs.artists.some((elem) => elem.id === id)) {
      favs.artists.push(artist);
      await this.favsRepository.save(favs);
    }
  }

  async addFavAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new CustomUnprocessableEntityError('album');
    const favs = await this.getOrCreateFavorites();
    if (!favs.albums.some((elem) => elem.id === id)) {
      favs.albums.push(album);
      await this.favsRepository.save(favs);
    }
  }

  async deleteFavTrack(id: string) {
    const favs = await this.getOrCreateFavorites();
    const track = favs.tracks.find((elem) => elem.id === id);
    if (!track) {
      throw new FavsNotFoundError('track');
    }
    favs.tracks = favs.tracks.filter((elem) => elem.id !== id);
    await this.favsRepository.save(favs);
  }

  async deleteFavArtist(id: string) {
    const favs = await this.getOrCreateFavorites();
    const artist = favs.artists.find((elem) => elem.id === id);
    if (!artist) {
      throw new FavsNotFoundError('artist');
    }
    favs.artists = favs.artists.filter((elem) => elem.id !== id);
    await this.favsRepository.save(favs);
  }

  async deleteFavAlbum(id: string) {
    const favs = await this.getOrCreateFavorites();
    const album = favs.albums.find((elem) => elem.id === id);
    if (!album) {
      throw new FavsNotFoundError('album');
    }
    favs.albums = favs.albums.filter((elem) => elem.id !== id);
    await this.favsRepository.save(favs);
  }

  private async getOrCreateFavorites(): Promise<Favorite> {
    let favs = await this.favsRepository.findOne({
      where: { id: 'favorites' },
    });

    if (!favs) {
      favs = this.favsRepository.create({
        id: 'favorites',
        artists: [],
        albums: [],
        tracks: [],
      });
      favs = await this.favsRepository.save(favs);
    }

    return favs;
  }
}
