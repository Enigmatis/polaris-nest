import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
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
  PolarisServerConfig,
} from "@enigmatis/polaris-core";
import { PolarisGraphQLLogger } from "@enigmatis/polaris-graphql-logger";
import { SubscriptionServerOptions } from "apollo-server-core/src/types";
import { PlaygroundConfig } from "apollo-server";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { Injectable } from "@nestjs/common";
import { GraphQLSchema } from "graphql";

@Injectable()
export class GqlOptionsFactoryService implements GqlOptionsFactory {
  constructor(private readonly configService: PolarisServerConfigService) {}
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    const config: PolarisServerConfig = this.configService.getPolarisServerConfig();
    const logger: PolarisGraphQLLogger = (config.logger as unknown) as PolarisGraphQLLogger;
    const plugins = createPolarisPlugins(
      logger as any,
      config,
      config.connectionManager
    );
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
      plugins: plugins as any,
      context,
      subscriptions,
      introspection,
      formatError: polarisFormatError,
      transformSchema: (schema: GraphQLSchema) => {
        return createPolarisSchemaWithMiddlewares(
          schema,
          logger as any,
          config,
          config.connectionManager
        );
      },
      path: config?.applicationProperties?.version,
      schemaDirectives: config?.schemaDirectives,
    };
  }
}
