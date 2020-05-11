import { Module } from "@nestjs/common";
import {Book} from "./book";
import {BookService} from "./book.service";
import {BookResolver} from "./book.resolver";
import {TypeOrmModule} from "../../../../../src/typeorm/typeorm.module";
import {DataInitializationModule} from "../../data-initialization/data-initialization.module";
import {Author} from "../author/author";

@Module({
    imports: [TypeOrmModule.forFeature([Book, Author]), DataInitializationModule],
    providers: [BookResolver, BookService],
})
export class BookModule {}
