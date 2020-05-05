import { Module } from "@nestjs/common";
import { PolarisModule } from "../../src/polaris/polaris.module";
import { AuthorModule } from "./dal/entities/author/author.module";
import { BookModule } from "./dal/entities/book/book.module";

@Module({
  imports: [AuthorModule, BookModule, PolarisModule],
})
export class AppModule {}
