import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import {
  PolarisGraphQLContext,
  ExpressContext,
  createPolarisSubscriptionsConfig,
  createPlaygroundConfig,
  createIntrospectionConfig,
  polarisFormatError,
  AbstractPolarisLogger,
} from "@enigmatis/polaris-core";
import {
  createPolarisContext,
  createPolarisMiddlewares,
  createPolarisPlugins,
} from "@enigmatis/polaris-core/dist/src/config/create-apollo-config-util";
import { PolarisGraphQLLogger } from "@enigmatis/polaris-graphql-logger";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { SubscriptionServerOptions } from "apollo-server-core/src/types";
import { PlaygroundConfig } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GqlOptionsService implements GqlOptionsFactory {
  constructor(
    private readonly configService: PolarisServerConfigService,
    private readonly loggerService: PolarisLoggerService
  ) {}
  createGqlOptions(): GqlModuleOptions {
    const config = this.configService.getPolarisServerConfig();
    const logger = (this.loggerService.getPolarisLogger(
      config
    ) as unknown) as PolarisGraphQLLogger;
    const plugins: Array<
      ApolloServerPlugin | (() => ApolloServerPlugin)
    > = createPolarisPlugins(logger, config);
    const middlewares: any[] = createPolarisMiddlewares(config, logger);
    const context: (
      context: ExpressContext
    ) => PolarisGraphQLContext = createPolarisContext(
      (logger as unknown) as AbstractPolarisLogger,
      config
    );
    const subscriptions:
      | Partial<SubscriptionServerOptions>
      | string
      | false = createPolarisSubscriptionsConfig(config);
    const playground: PlaygroundConfig = createPlaygroundConfig(config);
    const introspection: boolean | undefined = createIntrospectionConfig(
      config
    );
    return {
      installSubscriptionHandlers: config.allowSubscription,
      autoSchemaFile: true,
      playground,
      plugins,
      context,
      subscriptions,
      introspection,
      formatError: polarisFormatError,
      transformSchema: (schema: GraphQLSchema) => {
        return applyMiddleware(schema, ...middlewares);
      },
      path: config.applicationProperties.version,
      schemaDirectives: config.schemaDirectives,
    };
  }
}
