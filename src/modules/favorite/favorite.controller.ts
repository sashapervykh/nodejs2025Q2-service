import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { FavService } from './favorite.service';
import { handleError } from 'src/common/utils/handleErrors';
import { Response } from 'express';

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
  deleteTracks(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    try {
      this.favService.deleteFavTrack(id);
      response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('artist/:id')
  deleteArtists(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    try {
      this.favService.deleteFavArtist(id);
      response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('album/:id')
  deleteAlbums(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    try {
      this.favService.deleteFavAlbum(id);

      response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      handleError(err);
    }
  }
}
