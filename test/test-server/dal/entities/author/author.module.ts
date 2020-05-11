import { Module } from "@nestjs/common";
import {Author} from "./author";
import {AuthorResolver} from "./author.resolver";
import {AuthorService} from "./author.service";
import {TypeOrmModule} from "../../../../../src/typeorm/typeorm.module";

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
