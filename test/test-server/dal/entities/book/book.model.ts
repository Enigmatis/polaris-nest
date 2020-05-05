import { RepositoryEntity } from "../../../../../src";
import { AuthorModel } from "../author/author.model";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({
  implements: [RepositoryEntity],
})
export class BookModel extends RepositoryEntity {
  @Field({nullable:true})
  title: String;
  @Field((type) => AuthorModel, { nullable: true })
  author: AuthorModel;
}
