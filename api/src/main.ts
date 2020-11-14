import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './core/validation.pipe';
import { RoleGuard } from './auth/guards/role.guard';

async function bootstrap() {
  const port = process.env.PORT ? process.env.PORT : 4000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalGuards(new RoleGuard(new Reflector()));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
  console.log('App started on port:', port);
}
bootstrap();
