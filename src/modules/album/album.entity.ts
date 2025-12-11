import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  artist: Artist | null;

  @Column({ nullable: true })
  artistId: string | null;
}
