import { GqlModuleOptions } from "@nestjs/graphql";
import {
  PolarisGraphQLContext,
  ExpressContext,
  createPolarisSubscriptionsConfig,
  createPlaygroundConfig,
  createIntrospectionConfig,
  polarisFormatError,
  AbstractPolarisLogger,
  createPolarisContext,
  createPolarisPlugins,
  createPolarisSchemaWithMiddlewares,
} from "@enigmatis/polaris-core";
import { PolarisGraphQLLogger } from "@enigmatis/polaris-graphql-logger";
import { SubscriptionServerOptions } from "apollo-server-core/src/types";
import { PlaygroundConfig } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { PolarisServerOptionsService } from "../polaris-server-options/polaris-server-options.service";
import { PolarisServerConfig } from "@enigmatis/polaris-core/dist/src/config/polaris-server-config";

export const createGqlOptions = (
  optionsService: PolarisServerOptionsService,
  configService: PolarisServerConfigService,
  loggerService: PolarisLoggerService
): Promise<GqlModuleOptions> | GqlModuleOptions => {
  const config: PolarisServerConfig = configService.getPolarisServerConfig();
  const logger: PolarisGraphQLLogger = (loggerService.getPolarisLogger(
    config
  ) as unknown) as PolarisGraphQLLogger;
  const plugins = createPolarisPlugins(logger, config);
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
  const introspection: boolean | undefined = createIntrospectionConfig(config);
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
      return createPolarisSchemaWithMiddlewares(schema, logger, config);
    },
    path: config?.applicationProperties?.version,
    schemaDirectives: config?.schemaDirectives,
  };
};
