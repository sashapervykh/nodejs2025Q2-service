import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({ nullable: true })
  @IsUUID()
  @ValidateIf((object) => object.artistId !== null)
  artistId: string | null;

  @ApiProperty({ nullable: true })
  @IsUUID()
  @ValidateIf((object) => object.albumId !== null)
  albumId: string | null;
}

export class UpdateTrackDto extends CreateTrackDto {}
