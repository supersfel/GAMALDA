import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsOptions: CorsOptions = {
  //   origin: true,
  //   credentials: true,
  // }
  // app.enableCors(corsOptions)
  app.use(cors());
  await app.listen(8080);
}
bootstrap();
