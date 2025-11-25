import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const PORT = config.port || 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
