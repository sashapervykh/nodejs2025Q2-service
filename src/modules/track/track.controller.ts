import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { handleError } from 'src/common/utils/handleErrors';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Track } from './track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOkResponse({
    description: 'All tracks retrieved',
    type: [Track],
  })
  async getAll() {
    const tracks = await this.trackService.getAllTracks();
    return tracks;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track UUID',
  })
  @ApiOkResponse({
    description: 'Track with requested id retrieved',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const track = await this.trackService.getTrackById(id);
      return track;
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Track successfully created',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.trackService.createTrack(createTrackDto);
    return track;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track UUID',
  })
  @ApiOkResponse({
    description: 'Track successfully updated',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const updatedTrack = await this.trackService.updateTrack(
        id,
        updateTrackDto,
      );
      return updatedTrack;
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track UUID',
  })
  @ApiNoContentResponse({
    description: 'Track successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.trackService.deleteTrack(id);
    } catch (err) {
      handleError(err);
    }
  }
}
