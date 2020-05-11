import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RoutesModule } from "../routes/routes.module";
import { PolarisLoggerModule } from "../polaris-logger/polaris-logger.module";
import { RoutesService } from "../routes/routes.service";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { createGqlOptions } from "../polaris-gql-module-options/polaris-gql-module-options.service";
import { PolarisServerConfigModule } from "../polaris-server-config/polaris-server-config.module";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { RoutesController } from "../routes/routes.controller";
import { PolarisServerOptionsModule } from "../polaris-server-options/polaris-server-options.module";
import { PolarisServerOptionsService } from "../polaris-server-options/polaris-server-options.service";

@Module({
  imports: [
    PolarisServerConfigModule,
    PolarisLoggerModule,
    PolarisServerOptionsModule,
    RoutesModule,
    GraphQLModule.forRootAsync({
      useFactory: createGqlOptions,
      inject: [
        PolarisServerOptionsService,
        PolarisServerConfigService,
        PolarisLoggerService,
      ],
      imports: [
        PolarisServerOptionsModule,
        PolarisServerConfigModule,
        PolarisLoggerModule,
      ],
    }),
  ],
  providers: [
    RoutesService,
    PolarisServerConfigService,
    PolarisLoggerService,
    PolarisServerOptionsService,
  ],
  controllers: [RoutesController],
})
export class PolarisModule {}
