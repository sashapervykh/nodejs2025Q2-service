import { ApiProperty } from '@nestjs/swagger';

import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

export class Favorite {
  @ApiProperty({ type: [Artist] })
  artists: Artist[]; // favorite artists ids

  @ApiProperty({ type: [Album] })
  albums: Album[]; // favorite albums ids

  @ApiProperty({ type: [Track] })
  tracks: Track[]; // favorite tracks ids
}
