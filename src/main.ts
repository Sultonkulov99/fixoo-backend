import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
