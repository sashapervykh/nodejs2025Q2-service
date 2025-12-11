import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/modules/user/user.entity';
import { Artist } from './src/modules/artist/artist.entity';
import { Album } from './src/modules/album/album.entity';
import { Track } from './src/modules/track/track.entity';
import { Favorite } from './src/modules/favorite/favorite.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
