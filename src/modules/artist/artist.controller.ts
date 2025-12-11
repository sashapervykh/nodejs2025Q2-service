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
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOkResponse({
    description: 'All artists retrieved',
    type: [Artist],
  })
  async getAll() {
    const artists = this.artistService.getAllArtists();
    return artists;
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
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const artist = await this.artistService.getArtistById(id);
      return artist;
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
    const createdArtist = this.artistService.createArtist(createArtistDto);
    return createdArtist;
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      const updatedArtist = await this.artistService.updateArtist(
        id,
        updateArtistDto,
      );
      return updatedArtist;
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
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.artistService.deleteArtist(id);
    } catch (err) {
      handleError(err);
    }
  }
}
