import {Injectable, Type} from "@nestjs/common";
import { PolarisServerConfig } from "@enigmatis/polaris-core/dist/src/config/polaris-server-config";
import { getPolarisServerConfigFromOptions } from "@enigmatis/polaris-core/dist/src/server/configurations-manager";
import { polarisGraphQLLogger } from "../../test/test-server/utils/logger";
import {ExpressContext, PolarisServerOptions, RealitiesHolder} from "@enigmatis/polaris-core";
import { TestContext } from "../../test/test-server/context/test-context";
import * as customContextFields from "../../test/test-server/constants/custom-context-fields.json";
import { TestClassInContext } from "../../test/test-server/context/test-class-in-context";
import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface PolarisServerOptionsFactory {
  createTypeOrmOptions(connectionName?: string): Promise<PolarisServerOptions> | PolarisServerOptions;
}
export interface PolarisServerConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<PolarisServerOptionsFactory>;
  useClass?: Type<PolarisServerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PolarisServerOptions> | PolarisServerOptions;
  inject?: any[];
}

@Injectable()
export class PolarisServerConfigService {
  private readonly polarisServerConfig: PolarisServerConfig;

  constructor() {
    this.polarisServerConfig = getPolarisServerConfigFromOptions({
      typeDefs: [], // BY ANNOTATION
      resolvers: [], // BY ANNOTATION
      port: 8080, //DEFAULT IN SEED
      logger: polarisGraphQLLogger,
      supportedRealities: new RealitiesHolder(
        new Map([[3, { id: 3, type: "notreal3", name: "three" }]])
      ),
      customContext: (context: ExpressContext): Partial<TestContext> => {
        const { req, connection } = context;
        const headers = req ? req.headers : connection?.context;

        return {
          customField: customContextFields.customField,
          instanceInContext: new TestClassInContext(
            customContextFields.instanceInContext.someProperty
          ),
          requestHeaders: {
            customHeader: headers["custom-header"],
          },
        };
      },
    });
  }

  getPolarisServerConfig(): PolarisServerConfig {
    return this.polarisServerConfig;
  }
}
