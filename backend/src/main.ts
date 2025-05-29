import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
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

    const configService = app.get(ConfigService);

    // Global prefix
    app.setGlobalPrefix('api');

    // CORS
    app.enableCors();

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

=======
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  const config = new DocumentBuilder()
    .setTitle('Phillip Trustee API')
    .setDescription('API for dashboard/backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
bootstrap();
