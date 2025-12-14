import { Injectable } from '@nestjs/common';
import { Public } from './modules/common/decorators/public/public.decorator';

@Public()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Home Library Service 2025';
  }
}
