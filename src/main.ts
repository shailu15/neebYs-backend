import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ],
  credentials: true,
});

  const config = new DocumentBuilder()
  .setTitle('Neebys API')
  .setDescription('Backend API for Neebys')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();