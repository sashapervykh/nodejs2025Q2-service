import { Injectable } from '@nestjs/common';
import { database } from 'src/database/database';

@Injectable()
export class FavRepository {
  findAllFavs() {
    return database.favs;
  }

  addFavTrack(id: string) {
    if (database.favs.tracks.some((elem) => elem.id === id)) {
      return;
    }
    const track = database.tracks.find((elem) => elem.id === id);
    if (!track) throw new CustomNotProcessableError('track');
  }
  // getArtistById(id: string) {
  //   return database.artists.find((elem) => elem.id === id);
  // }

  // createArtist(artist: Artist) {
  //   database.artists.push(artist);
  // }

  // deleteArtist(id: string) {
  //   database.artists = database.artists.filter((elem) => elem.id !== id);
  //   database.albums
  //     .filter((elem) => elem.artistId === id)
  //     .forEach((elem) => {
  //       elem.artistId = null;
  //     });
  //   database.tracks
  //     .filter((elem) => elem.artistId === id)
  //     .forEach((elem) => {
  //       elem.artistId = null;
  //     });
  // }

  // updateArtist(artist: Artist) {
  //   const oldArtist = this.getArtistById(artist.id);
  //   oldArtist.name = artist.name;
  //   oldArtist.grammy = artist.grammy;
  // }
}
