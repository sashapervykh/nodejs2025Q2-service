import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SignInDto extends SignUpDto {}

export class RefreshDto {
  @ApiProperty()
  refreshToken: string | undefined;
}
