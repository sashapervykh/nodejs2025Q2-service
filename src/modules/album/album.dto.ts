import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty({ nullable: true })
  @IsUUID()
  @ValidateIf((object) => object.artistId !== null)
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
