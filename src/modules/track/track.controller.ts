import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { handleError } from 'src/common/utils/handleErrors';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAllTracks();
  }

  @Get(':id') getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.trackService.getTrackById(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.updateAlbum(id, updateTrackDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Res() response: Response) {
    try {
      this.trackService.deleteTrack(id);
      response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      handleError(err);
    }
  }
}
