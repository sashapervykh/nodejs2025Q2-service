import { Album } from 'src/modules/album/album.interface';
import { Artist } from 'src/modules/artist/artist.entity';
import { Favorite } from 'src/modules/favorite/favorite.interface';
import { Track } from 'src/modules/track/track.interface';
import { User } from 'src/modules/user/user.entity';

export class Database {
  users: User[] = [];
  favs: Favorite = { albums: [], artists: [], tracks: [] };
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
}

export const database = new Database();
