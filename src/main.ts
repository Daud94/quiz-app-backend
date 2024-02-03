import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const config = new DocumentBuilder()
    .setTitle('Quiz app API')
    .setDescription('Quiz API documentation')
    .setVersion('1.0')
    .addTag('Quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
