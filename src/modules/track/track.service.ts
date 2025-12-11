import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { CustomNotFoundError } from 'src/common/utils/customErrors';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  getAllTracks() {
    return this.trackRepository.find();
  }

  async getTrackById(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomNotFoundError('track');
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const createTrack = await this.trackRepository.save(createTrackDto);
    return createTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomNotFoundError('track');
    await this.trackRepository.delete(id);
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new CustomNotFoundError('track');
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    const updatedTrack = await this.trackRepository.save(track);
    return updatedTrack;
  }
}
