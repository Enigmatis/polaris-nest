import { startTestServer, stopTestServer } from "../test-server/test-server";
import { graphqlRawRequest } from "../test-server/utils/graphql-client";
import * as booksWithWarnings from "./jsonRequestsAndHeaders/queryForBooksWithWarnings.json";
import { PolarisServerOptions } from "@enigmatis/polaris-core";
import { createOptions } from "../test-server/polaris-server-options-factory/polaris-server-options-factory-service";
import * as optionsModule from "../test-server/polaris-server-options-factory/polaris-server-options-factory-service";

describe("warnings disabled tests", () => {
  describe("shouldAddWarningsToExtensions is false", () => {
    beforeEach(async () => {
      const warningConfig: Partial<PolarisServerOptions> = {
        shouldAddWarningsToExtensions: false,
      };
      let polarisServerOptions: PolarisServerOptions = createOptions();
      polarisServerOptions = { ...polarisServerOptions, ...warningConfig };
      jest
        .spyOn(optionsModule, "createOptions")
        .mockImplementation(() => polarisServerOptions);
      let x = optionsModule.createOptions();
      await startTestServer();
    });

    afterEach(async () => {
      await stopTestServer();
    });

    it("should not return warnings in the extensions of the response", async () => {
      const result = await graphqlRawRequest(
        booksWithWarnings.request,
        booksWithWarnings.headers
      );
      expect(result.extensions.warnings).toBeUndefined();
    });
  });
});
