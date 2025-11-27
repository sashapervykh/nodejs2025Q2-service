import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  // Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './album.dto';
// import { CreateArtistDto, UpdateArtistDto } from './album.dto';
import { handleError } from 'src/common/utils/handleErrors';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id') getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.albumService.getAlbumById(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
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

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Res() response: Response) {
    try {
      this.albumService.deleteAlbum(id);
      response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      handleError(err);
    }
  }
}
