import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { AuthJwtGuard } from './auth/guards/auth-jwt.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Medical Records APi')
    .setDescription('Descriptions of endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalGuards(new AuthJwtGuard(new Reflector()));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT);
}
bootstrap();
