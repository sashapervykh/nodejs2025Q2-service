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
import { Track } from './track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOkResponse({
    description: 'All tracks retrieved',
    type: [Track],
  })
  getAll() {
    return this.trackService.getAllTracks();
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
  getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.trackService.getTrackById(id);
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
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
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
  delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.trackService.deleteTrack(id);
    } catch (err) {
      handleError(err);
    }
  }
}
