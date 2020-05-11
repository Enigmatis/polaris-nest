import { Injectable } from "@nestjs/common";
import {
  ExpressContext,
  PolarisServerOptions,
  RealitiesHolder,
} from "@enigmatis/polaris-core";
import { polarisGraphQLLogger } from "../../test/test-server/utils/logger";
import { TestContext } from "../../test/test-server/context/test-context";
import * as customContextFields from "../../test/test-server/constants/custom-context-fields.json";
import { TestClassInContext } from "../../test/test-server/context/test-class-in-context";

@Injectable()
export class PolarisServerOptionsService {
  private readonly polarisServerOptions: PolarisServerOptions;

  constructor() {
    this.polarisServerOptions = {
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
    };
  }

  getPolarisServerOptions(): PolarisServerOptions {
    return this.polarisServerOptions;
  }
}
