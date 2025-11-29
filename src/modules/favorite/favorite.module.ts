import { Module } from '@nestjs/common';
import { FavController } from './favorite.controller';
import { FavService } from './favorite.service';
import { FavRepository } from './favorite.repository';

@Module({
  controllers: [FavController],
  providers: [FavService, FavRepository],
})
export class FavsModule {}
