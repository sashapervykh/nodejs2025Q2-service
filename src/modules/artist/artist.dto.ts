import { IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsString()
  grammy: string;
}

// export class UpdateArtistDto {
//   @IsString()
//   oldPassword: string;

//   @IsString()
//   newPassword: string;
// }
