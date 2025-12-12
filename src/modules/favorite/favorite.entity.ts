import { Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryColumn()
  id: string = 'favorites';
  @ApiProperty({ type: [Artist] })
  @ManyToMany(() => Artist, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  @ManyToMany(() => Album, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  albums: Album[];

  @ApiProperty({ type: [Track] })
  @ManyToMany(() => Track, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  tracks: Track[];
}
