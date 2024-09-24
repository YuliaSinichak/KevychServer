import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['https://kevych-client.vercel.app/', 'http://localhost:3000'],
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
