import {
  GqlModuleOptions,
  GraphQLFactory,
  GraphQLModule,
  GraphQLTypesLoader,
  GraphQLAstExplorer,
} from "@nestjs/graphql";
import {
  ApplicationConfig,
  HttpAdapterHost,
  MetadataScanner,
} from "@nestjs/core";
import { Inject, Module } from "@nestjs/common";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { initSnapshotGraphQLOptions } from "@enigmatis/polaris-core";
import { PolarisGraphQLLogger } from "@enigmatis/polaris-graphql-logger";
import { RecipesModule } from "../recipes/recipes.module";
import {
  PluginsExplorerService,
  ResolversExplorerService,
  ScalarsExplorerService,
} from "@nestjs/graphql/dist/services";
import { GraphQLSchemaBuilder } from "@nestjs/graphql/dist/graphql-schema-builder";

const CONFIG_SERVICE = "PolarisServerConfigService";
const LOGGER_SERVICE = "PolarisLoggerService";

@Module({})
export class PolarisGraphQLModule extends GraphQLModule {
  constructor(
    httpAdapterHost: HttpAdapterHost,
    options: GqlModuleOptions,
    graphqlFactory: GraphQLFactory,
    graphqlTypesLoader: GraphQLTypesLoader,
    applicationConfig: ApplicationConfig,
    @Inject(CONFIG_SERVICE)
    private readonly configService: PolarisServerConfigService,
    @Inject(LOGGER_SERVICE) private readonly loggerService: PolarisLoggerService
  ) {
    super(
      httpAdapterHost,
      options,
      graphqlFactory,
      graphqlTypesLoader,
      applicationConfig
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
