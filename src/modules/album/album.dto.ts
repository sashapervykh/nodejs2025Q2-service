import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @ValidateIf((object) => object.artistId !== null)
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
