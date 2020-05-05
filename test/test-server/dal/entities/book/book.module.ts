import { Module } from "@nestjs/common";
import {TypeOrmModule} from "../../../../../src/lib";
import {Book} from "./book";
import {BookService} from "./book.service";
import {BookResolver} from "./book.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BookResolver, BookService],
})
export class BookModule {}
