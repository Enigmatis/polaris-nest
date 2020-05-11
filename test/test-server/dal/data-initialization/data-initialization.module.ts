import { Module } from "@nestjs/common";
import { DataInitializationService } from "./data-initialization.service";
import { TypeOrmModule } from "../../../../src/typeorm/typeorm.module";
import { Author } from "../entities/author/author";
import { Book } from "../entities/book/book";
import { DataInitializationResolver } from "./data.initialization.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [DataInitializationService, DataInitializationResolver],
})
export class DataInitializationModule {}
