import { Inject, Injectable, Scope } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "../../../../../src";
import {
  PolarisConnection,
  PolarisRepository,
} from "@enigmatis/polaris-typeorm";
import { CONTEXT } from "@nestjs/graphql";
import { PolarisGraphQLContext } from "@enigmatis/polaris-core";
import {Author} from "./author";

@Injectable({ scope: Scope.REQUEST })
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: PolarisRepository<Author>,
    @InjectConnection()
    private readonly connection: PolarisConnection,
    @Inject(CONTEXT) private readonly ctx: PolarisGraphQLContext
  ) {}

  async create(firstName:string,lastName:string): Promise<Author | Author> {
    const author = new Author(firstName, lastName);
    return await this.authorRepository.save(this.ctx, author) as unknown as Promise<Author | Author>;
  }

  async findOneById(id: string): Promise<Author> {
    return this.authorRepository.findOne(this.ctx, id);
  }

  async findOneByName(name: string): Promise<Author> {
    return this.authorRepository.findOne(this.ctx, name);
  }

  async remove(id: string): Promise<void> {
    await this.authorRepository.delete(this.ctx, id);
  }
}
