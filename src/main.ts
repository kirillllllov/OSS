import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Управление ОСС API')
    .setDescription('API для автоматизации общих собраний собственников МКД')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'fallback-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,      // для разработки (http). В production с https = true
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 часа
      },
    }),
  );




  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Приложение запущено на http://localhost:${port}`);
  console.log(`Swagger доступен по адресу http://localhost:${port}/api/docs`);
}
bootstrap();
