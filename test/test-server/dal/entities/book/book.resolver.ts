import {
    Args,
    Mutation,
    Query,
    Resolver,
} from "@nestjs/graphql";
import {BookModel} from "./book.model";
import {BookService} from "./book.service";
import {Book} from "./book";

@Resolver((of) => BookModel)
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Query((returns) => [BookModel])
    async allBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }
    @Query((returns) => [BookModel])
    async allBooksWithWarnings(): Promise<Book[]> {
        return this.bookService.findAllWithWarnings();
    }
    @Query((returns) => [BookModel])
    async bookByTitle(@Args("title") title: string): Promise<Book[]> {
        const books = await this.bookService.booksByTitle(title);
        return books;
    }

    @Mutation((returns) => BookModel)
    async updateBooksByTitle(
        @Args("title") title: string,@Args("newTitle") newTitle: string
    ): Promise<Book[] | Book> {
        return await this.bookService.updateBooksByTitle(title,newTitle);
    }

    @Mutation((returns) => Boolean)
    async deleteBook(@Args("id") id: string) {
        return this.bookService.remove(id);
    }
}
