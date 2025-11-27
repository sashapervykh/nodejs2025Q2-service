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

  // @Get(':id') getById(@Param('id', ParseUUIDPipe) id: string) {
  //   try {
  //     return this.artistService.getArtistById(id);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // }

  @Post('track/:id')
  tracks(@Param('id', ParseUUIDPipe) id: string) {
    this.favService.addFavTrack(id);
    return { message: 'Track was added to favorite!' };
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateArtistDto: UpdateArtistDto,
  // ) {
  //   try {
  //     return this.artistService.updateArtist(id, updateArtistDto);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseUUIDPipe) id: string, @Res() response: Response) {
  //   try {
  //     this.artistService.deleteArtist(id);
  //     response.status(HttpStatus.NO_CONTENT).send();
  //   } catch (err) {
  //     handleError(err);
  //   }
  // }
}
