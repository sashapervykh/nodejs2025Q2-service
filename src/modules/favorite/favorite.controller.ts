import {
  // Body,
  Controller,
  // Delete,
  Get,
  // HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  // Put,
  // Res,
} from '@nestjs/common';
import { FavService } from './favorite.service';
// import { Response } from 'express';
// import { CreateArtistDto, UpdateArtistDto } from './favorite.dto';
// import { handleError } from 'src/common/utils/handleErrors';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  getAll() {
    return this.favService.getAllFavs();
  }

  @Post('track/:id')
  tracks(@Param('id', ParseUUIDPipe) id: string) {
    this.favService.addFavTrack(id);
    return { message: 'Track was added to favorite!' };
  }

  @Post('artist/:id')
  artists(@Param('id', ParseUUIDPipe) id: string) {
    this.favService.addFavArtist(id);
    return { message: 'Artist was added to favorite!' };
  }

  @Post('album/:id')
  albums(@Param('id', ParseUUIDPipe) id: string) {
    this.favService.addFavAlbum(id);
    return { message: 'Artist was added to favorite!' };
  }
}
