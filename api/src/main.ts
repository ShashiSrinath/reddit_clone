import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./core/validation.pipe";
import { RoleGuard } from './auth/guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RoleGuard(new Reflector()))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('App started on port: 3000')
}
bootstrap();
