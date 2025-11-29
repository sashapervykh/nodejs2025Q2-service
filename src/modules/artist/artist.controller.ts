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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { handleError } from 'src/common/utils/handleErrors';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Artist } from './artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOkResponse({
    description: 'All artists retrieved',
    type: [Artist],
  })
  getAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist UUID',
  })
  @ApiOkResponse({
    description: 'Artist with requested id retrieved',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.artistService.getArtistById(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Artist successfully created',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist UUID',
  })
  @ApiOkResponse({
    description: 'Artist successfully updated',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return this.artistService.updateArtist(id, updateArtistDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist UUID',
  })
  @ApiNoContentResponse({
    description: 'Artist successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.artistService.deleteArtist(id);
    } catch (err) {
      handleError(err);
    }
  }
}
