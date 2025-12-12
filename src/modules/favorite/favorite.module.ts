import { Module } from '@nestjs/common';
import { FavController } from './favorite.controller';
import { FavService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Favorite } from './favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [FavController],
  providers: [FavService],
})
export class FavsModule {}
