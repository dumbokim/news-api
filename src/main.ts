import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: '.env',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(80);
}
bootstrap();
