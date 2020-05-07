import {
  GraphQLFactory,
  GraphQLModule,
  GraphQLTypesLoader,
} from "@nestjs/graphql";
import { ApplicationConfig, HttpAdapterHost } from "@nestjs/core";
import { Inject, Module } from "@nestjs/common";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { initSnapshotGraphQLOptions } from "@enigmatis/polaris-core";
import { PolarisGraphQLLogger } from "@enigmatis/polaris-graphql-logger";
import { GqlOptionsService } from "../polaris-gql-module-options/polaris-gql-module-options.service";
import { PolarisServerConfigModule } from "../polaris-server-config/polaris-server-config.module";
import { PolarisLoggerModule } from "../polaris-logger/polaris-logger.module";
import { GqlOptionsModule } from "../polaris-gql-module-options/polaris-gql-module-options.module";

@Module({
  imports: [PolarisServerConfigModule, PolarisLoggerModule],
  providers: [PolarisServerConfigService, PolarisLoggerService],
})
export class PolarisGraphQLModule extends GraphQLModule {
  constructor(
    httpAdapterHost: HttpAdapterHost,
    // @Inject() gqlOptionsService: GqlOptionsService,
    graphqlFactory: GraphQLFactory,
    graphqlTypesLoader: GraphQLTypesLoader,
    applicationConfig: ApplicationConfig,
    @Inject()
    private readonly configService: PolarisServerConfigService,
    @Inject() private readonly loggerService: PolarisLoggerService
  ) {
    super(
      httpAdapterHost,
      // gqlOptionsService.createGqlOptions(),
      {},
      graphqlFactory,
      graphqlTypesLoader,
      applicationConfig
    );
    console.log(
      "================================check================================"
    );
  }

  async onModuleInit() {
    await super.onModuleInit();
    const config = this.configService.getPolarisServerConfig();
    const logger = (this.loggerService.getPolarisLogger(
      config
    ) as unknown) as PolarisGraphQLLogger;
    initSnapshotGraphQLOptions(
      logger,
      config,
      this.apolloServer,
      this.apolloServer.requestOptions.schema
    );
  }
}
