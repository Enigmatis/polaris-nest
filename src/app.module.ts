import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { PolarisEntitiesModule } from "./polaris-entities/polaris-entities.module";
import { TypeOrmModule } from "./lib";
import { RoutesController } from "./routes/routes.controller";
import { PolarisLoggerService } from "./polaris-logger/polaris-logger.service";
import { GqlOptionsService } from "./polaris-gql-module-options/polaris-gql-module-options.service";
import { PolarisServerConfigService } from "./polaris-server-config/polaris-server-config.service";
import { TypeOrmOptionsFactoryService } from "./type-orm-options-factory/type-orm-options-factory.service";
import { PolarisLoggerModule } from "./polaris-logger/polaris-logger.module";
import { PolarisServerConfigModule } from "./polaris-server-config/polaris-server-config.module";
import { RoutesModule } from "./routes/routes.module";
import { RoutesService } from "./routes/routes.service";
import { PolarisGraphQLModule } from "./polaris-gql-module/polaris-gql-module";
import { GqlOptionsModule } from "./polaris-gql-module-options/polaris-gql-module-options.module";

@Module({
  imports: [
    RecipesModule,
    PolarisServerConfigModule,
    PolarisLoggerModule,
    // PolarisServerOptionsModule,
    PolarisGraphQLModule.forRootAsync({
      useClass: GqlOptionsService,
      inject: [
        PolarisServerConfigService,
        PolarisLoggerService,
        GqlOptionsService,
      ],
      imports: [
        PolarisServerConfigModule,
        PolarisLoggerModule,
        GqlOptionsModule,
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsFactoryService,
      inject: [PolarisLoggerService],
      imports: [PolarisLoggerModule],
    }),
    PolarisEntitiesModule,
    RoutesModule,
    GqlOptionsModule,
  ],
  providers: [
    RoutesService,
    PolarisServerConfigService,
    PolarisLoggerService,
    GqlOptionsService,
  ], // PolarisServerOptionsService
  controllers: [RoutesController],
})
export class AppModule {}
