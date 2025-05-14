import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DtoValidationPipe } from './shared/validation/dto-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);  
  app.useGlobalPipes(new DtoValidationPipe());
}
bootstrap();
