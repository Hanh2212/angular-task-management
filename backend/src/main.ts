import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 6789;
  await app.listen(port);
  logger.log(`App listening on port`, port)
}
bootstrap();
