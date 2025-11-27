import {
  Body,
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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './artist.dto';
import { handleError } from 'src/common/utils/handleErrors';
// import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id') getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.artistService.getArtistById(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  // ) {
  //   try {
  //     return this.userService.updatePassword(id, updatePasswordDto);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseUUIDPipe) id: string, @Res() response: Response) {
  //   try {
  //     this.userService.deleteUser(id);
  //     response.status(HttpStatus.NO_CONTENT).send();
  //   } catch (err) {
  //     handleError(err);
  //   }
  // }
}
