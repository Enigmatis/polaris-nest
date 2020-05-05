import { Module } from "@nestjs/common";
import {TypeOrmModule} from "../../../../../src/lib";
import {Author} from "./author";
import {AuthorResolver} from "./author.resolver";
import {AuthorService} from "./author.service";

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
