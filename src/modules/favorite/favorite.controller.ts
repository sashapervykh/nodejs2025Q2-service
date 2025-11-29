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

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  getAll() {
    return this.favService.getAllFavs();
  }

  @Post('track/:id')
  addTracks(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.addFavTrack(id);
      return { message: 'Track was added to favorite!' };
    } catch (err) {
      handleError(err);
    }
  }

  @Post('artist/:id')
  addArtists(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.addFavArtist(id);

      return { message: 'Artist was added to favorite!' };
    } catch (err) {
      handleError(err);
    }
  }

  @Post('album/:id')
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
  deleteTracks(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavTrack(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtists(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavArtist(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbums(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favService.deleteFavAlbum(id);
    } catch (err) {
      handleError(err);
    }
  }
}
