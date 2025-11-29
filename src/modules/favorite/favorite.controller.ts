import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavService } from './favorite.service';
import { handleError } from 'src/common/utils/handleErrors';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Favorite } from './favorite.interface';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  @ApiOkResponse({
    description: 'All favorites retrieved',
    type: [Favorite],
  })
  getAll() {
    return this.favService.getAllFavs();
  }

  @Post('track/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track UUID',
  })
  @ApiOkResponse({
    description: 'Track with requested id is added to favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 422,
    description: 'Track with this id does not exist',
  })
  addTracks(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.addFavTrack(id);
      return { message: 'Track was added to favorite!' };
    } catch (err) {
      handleError(err);
    }
  }

  @Post('artist/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist UUID',
  })
  @ApiOkResponse({
    description: 'Artist with requested id is added to favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist with this id does not exist',
  })
  addArtists(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.addFavArtist(id);

      return { message: 'Artist was added to favorite!' };
    } catch (err) {
      handleError(err);
    }
  }

  @Post('album/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album UUID',
  })
  @ApiOkResponse({
    description: 'Album with requested id is added to favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 422,
    description: 'Album with this id does not exist',
  })
  addAlbums(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.addFavAlbum(id);
      return { message: 'Album was added to favorite!' };
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track UUID',
  })
  @ApiNoContentResponse({
    description: 'Track with requested id deleted from favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with this id is not in favorite',
  })
  deleteTracks(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavTrack(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist UUID',
  })
  @ApiNoContentResponse({
    description: 'Artist with requested id deleted from favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id is not in favorite',
  })
  deleteArtists(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavArtist(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album UUID',
  })
  @ApiNoContentResponse({
    description: 'Album with requested id deleted from favorite',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with this id is not in favorite',
  })
  deleteAlbums(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavAlbum(id);
    } catch (err) {
      handleError(err);
    }
  }
}
