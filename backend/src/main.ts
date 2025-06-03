import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });

    const configService = app.get(ConfigService); // Global prefix
    app.setGlobalPrefix('api');

    // CORS configuration
    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      maxAge: 3600,
    });

    // Pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Interceptors & Filters
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new GlobalExceptionFilter());

    // Swagger Setup
    const config = new DocumentBuilder()
      .setTitle('Phillip Trustee API')
      .setDescription('API for dashboard/backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    // Start the server
    const port = configService.get('app.port', 3005);
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(
      `Swagger documentation available at: http://localhost:${port}/api-docs`,
    );
    console.log('Environment:', configService.get('app.nodeEnv'));
    console.log('Database URL:', configService.get('app.database.url'));
  } catch (error) {
    console.error('Application failed to start:', error);
    process.exit(1);
  }
}

bootstrap();
