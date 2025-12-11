import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
