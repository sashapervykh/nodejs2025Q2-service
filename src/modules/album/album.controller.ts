import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
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

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumService.updateAlbum(id, updateAlbumDto);
    } catch (err) {
      handleError(err);
    }
  }

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
