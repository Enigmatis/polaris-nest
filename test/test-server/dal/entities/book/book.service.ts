import { Inject, Injectable, Scope } from "@nestjs/common";
import {
  Like,
  PolarisConnection,
  PolarisRepository,
} from "@enigmatis/polaris-typeorm";
import { CONTEXT } from "@nestjs/graphql";
import { PolarisGraphQLContext } from "@enigmatis/polaris-core";
import { Book } from "./book";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";

@Injectable({ scope: Scope.REQUEST })
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: PolarisRepository<Book>,
    @InjectConnection()
    private readonly connection: PolarisConnection,
    @Inject(CONTEXT) private readonly ctx: PolarisGraphQLContext
  ) {}

  async findAll(): Promise<any[]> {
    const c = await this.connection
      .getRepository(Book)
      .find(this.ctx, { relations: ["author"] });
    return this.bookRepository.find(this.ctx, { relations: ["author"] });
  }

  async findAllWithWarnings(): Promise<Book[]> {
    const c = await this.connection.getRepository(Book).find(this.ctx);
    this.ctx.returnedExtensions.warnings = ["warning 1", "warning 2"];
    return this.bookRepository.find(this.ctx, { relations: ["author"] });
  }

  async booksByTitle(title: string): Promise<Book[]> {
    return this.bookRepository.find(this.ctx, {
      where: { title: Like(`%${title}%`) },
      relations: ["author"],
    });
  }

  async updateBooksByTitle(
    title: string,
    newTitle: string
  ): Promise<Book[] | Book> {
    const result: Book[] = await this.bookRepository.find(this.ctx, {
      where: { title: Like(`%${title}%`) },
    });

    result.forEach((book) => (book.title = newTitle));
    return this.bookRepository.save(this.ctx, result);
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(this.ctx, id);
  }
}
