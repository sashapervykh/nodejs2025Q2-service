import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

// export class UpdateArtistDto {
//   @IsString()
//   oldPassword: string;

//   @IsString()
//   newPassword: string;
// }
