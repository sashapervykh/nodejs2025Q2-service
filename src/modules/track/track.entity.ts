import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @Column({ nullable: true })
  albumId: string | null;
}
