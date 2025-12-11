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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Album } from './album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOkResponse({
    description: 'All albums retrieved',
    type: [Album],
  })
  async getAll() {
    const albums = this.albumService.getAllAlbums();
    return albums;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album UUID',
  })
  @ApiOkResponse({
    description: 'Album with requested id retrieved',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const album = await this.albumService.getAlbumById(id);
      return album;
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Album successfully created',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumService.createAlbum(createAlbumDto);
    return album;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album UUID',
  })
  @ApiOkResponse({
    description: 'Album successfully updated',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const updateAlbum = await this.albumService.updateAlbum(
        id,
        updateAlbumDto,
      );
      return updateAlbum;
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album UUID',
  })
  @ApiNoContentResponse({
    description: 'Album successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.albumService.deleteAlbum(id);
    } catch (err) {
      handleError(err);
    }
  }
}
