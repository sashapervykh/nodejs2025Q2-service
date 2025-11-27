import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsUUID()
  @ValidateIf((object) => object.artistId !== null)
  artistId: string | null;

  @IsUUID()
  @ValidateIf((object) => object.albumId !== null)
  albumId: string | null;
}

export class UpdateTrackDto extends CreateTrackDto {}
