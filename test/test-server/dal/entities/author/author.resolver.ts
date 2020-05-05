import {
    Args,
    Mutation,
    Query,
    Resolver,
} from "@nestjs/graphql";
import {AuthorModel} from "./author.model";
import {AuthorService} from "./author.service";
import {Author} from "./author";

@Resolver((of) => AuthorModel)
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) {}

    @Query((returns) => AuthorModel)
    async authorsByName(@Args("name") id: string): Promise<Author> {
        return this.authorService.findOneByName(id);
    }
    @Query((returns) => AuthorModel)
    async authorsById(@Args("id") id: string): Promise<Author> {
        return this.authorService.findOneById(id);
    }

    @Mutation((returns) => AuthorModel)
    async createAuthor(
        @Args("firstName") firstName: string,@Args("lastName") lastName: string
    ): Promise<Author[] | Author> {
        return await this.authorService.create(firstName,lastName);
    }

    @Mutation((returns) => Boolean)
    async deleteAuthor(@Args("id") id: string) {
        return this.authorService.remove(id);
    }
}
