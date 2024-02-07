import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";

require("dotenv").config();

declare const module: any;
const isProduction = process.env["NODE_ENV"] === "production";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const config = new DocumentBuilder()
    .setTitle("Quiz app API")
    .setDescription("Quiz API documentation")
    .setVersion("1.0")
    .addTag("Quiz")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableVersioning({
    type: VersioningType.URI,
    // prefix: '/api'
  });

  await app.listen(isProduction
    ? parseInt(process.env["PROD_API_PORT"])
    : parseInt(process.env["DEV_API_PORT"]));
}

bootstrap();
