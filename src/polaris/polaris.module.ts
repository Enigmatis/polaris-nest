import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RoutesModule } from "../routes/routes.module";
import { PolarisLoggerModule } from "../polaris-logger/polaris-logger.module";
import { RoutesService } from "../routes/routes.service";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { GqlOptionsFactoryService } from "../polaris-gql-module-options/polaris-gql-module-options.service";
import { PolarisServerConfigModule } from "../polaris-server-config/polaris-server-config.module";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { RoutesController } from "../routes/routes.controller";

@Module({
  imports: [
    PolarisServerConfigModule,
    PolarisLoggerModule,
    RoutesModule,
    GraphQLModule.forRootAsync({
      useClass: GqlOptionsFactoryService,
      imports: [
        PolarisServerConfigModule,
        PolarisLoggerModule,
     ],
    }),
  ],
  providers: [RoutesService, PolarisServerConfigService, PolarisLoggerService],
  controllers: [RoutesController],
})
export class PolarisModule {}
