import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstrap function to initialize and start the NestJS application.
 * This function configures CORS, validation pipes, and starts the server.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend-backend communication
  app.enableCors({
    origin: true, // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Listen on all interfaces (0.0.0.0) for external access
  await app.listen(3000, '0.0.0.0');
  console.log('Wall of Regret backend is running on http://0.0.0.0:3000');
}
bootstrap();
