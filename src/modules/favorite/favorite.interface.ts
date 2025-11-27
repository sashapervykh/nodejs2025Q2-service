import { Album } from '../album/album.interface';
import { Artist } from '../artist/artist.interface';
import { Track } from '../track/track.interface';

export interface Favorite {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
