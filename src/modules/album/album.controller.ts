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
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.albumService.deleteAlbum(id);
    } catch (err) {
      handleError(err);
    }
  }
}
