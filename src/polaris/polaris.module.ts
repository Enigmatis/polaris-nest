import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RoutesModule } from "../routes/routes.module";
import { PolarisEntitiesModule } from "../polaris-entities/polaris-entities.module";
import { PolarisLoggerModule } from "../polaris-logger/polaris-logger.module";
import { RoutesService } from "../routes/routes.service";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { createGqlOptions } from "../polaris-gql-module-options/polaris-gql-module-options.service";
import { PolarisServerConfigModule } from "../polaris-server-config/polaris-server-config.module";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { RoutesController } from "../routes/routes.controller";
import { TypeOrmOptionsFactoryService } from "../type-orm-options-factory/type-orm-options-factory.service";
import { TypeOrmModule } from "../lib";
import { PolarisServerOptionsModule } from "../polaris-server-options/polaris-server-options.module";
import { PolarisServerOptionsService } from "../polaris-server-options/polaris-server-options.service";

@Module({
  imports: [
    PolarisServerConfigModule,
    PolarisLoggerModule,
    PolarisServerOptionsModule,
    GraphQLModule.forRootAsync({
      useFactory: createGqlOptions,
      inject: [PolarisServerConfigService, PolarisLoggerService],
      imports: [PolarisServerConfigModule, PolarisLoggerModule],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsFactoryService,
      inject: [PolarisLoggerService],
      imports: [PolarisLoggerModule],
    }),
    PolarisEntitiesModule,
    RoutesModule,
  ],
  providers: [
    RoutesService,
    PolarisServerConfigService,
    PolarisLoggerModule,
    PolarisServerOptionsService,
  ],
  controllers: [RoutesController],
})
export class PolarisModule {}
