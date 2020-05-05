import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setApp } from "../../src";
import { INestApplication } from "@nestjs/common";
export let app: INestApplication = {} as INestApplication;
export async function bootstrap() {
  app = await NestFactory.create(AppModule);
  setApp(app);
  await app.listen(8080);
}
