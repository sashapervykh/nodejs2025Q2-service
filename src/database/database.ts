import { Album } from 'src/modules/album/album.interface';
import { Artist } from 'src/modules/artist/artist.interface';
import { Favorite } from 'src/modules/favorite/favorite.interface';
import { Track } from 'src/modules/track/track.interface';
import { User } from 'src/modules/user/user.interface';

export class Database {
  users: User[] = [];
  favorites: Favorite[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
}

export const database = new Database();
