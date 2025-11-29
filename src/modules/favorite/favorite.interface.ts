import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../album/album.interface';
import { Artist } from '../artist/artist.interface';
import { Track } from '../track/track.interface';

export class Favorite {
  @ApiProperty({ type: [Artist] })
  artists: Artist[]; // favorite artists ids

  @ApiProperty({ type: [Album] })
  albums: Album[]; // favorite albums ids

  @ApiProperty({ type: [Track] })
  tracks: Track[]; // favorite tracks ids
}
