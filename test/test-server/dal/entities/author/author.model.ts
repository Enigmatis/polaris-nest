import { Field, ObjectType } from "@nestjs/graphql";
import { RepositoryEntity } from "../../../../../src";
import { BookModel } from "../book/book.model";

@ObjectType({
  implements: [RepositoryEntity],
})
export class AuthorModel extends RepositoryEntity {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(type => [BookModel], { nullable: true })
  books: BookModel[];
}
