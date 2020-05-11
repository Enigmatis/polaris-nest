import { Module } from "@nestjs/common";
import { PolarisModule } from "../../src/polaris/polaris.module";
import { AuthorModule } from "./dal/entities/author/author.module";
import { BookModule } from "./dal/entities/book/book.module";
import {TypeOrmModule} from "../../src/lib";
import {TypeOrmOptionsFactoryService} from "../../src/type-orm-options-factory/type-orm-options-factory.service";
import {PolarisLoggerService} from "../../src/polaris-logger/polaris-logger.service";
import {PolarisLoggerModule} from "../../src/polaris-logger/polaris-logger.module";

@Module({
  imports: [AuthorModule, BookModule, PolarisModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsFactoryService,
      inject: [PolarisLoggerService],
      imports: [PolarisLoggerModule],
    })
  ],
})
export class AppModule {}
