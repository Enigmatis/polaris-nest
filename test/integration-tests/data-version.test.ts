import * as dataVersionFiltering from "./jsonRequestsAndHeaders/dataVersionFiltering.json";
import * as mutation from "./jsonRequestsAndHeaders/mutation.json";
import * as simpleQuery from "./jsonRequestsAndHeaders/simpleQuery.json";
import { startTestServer, stopTestServer } from "../test-server/test-server";
import {
  graphqlRawRequest,
  graphQLRequest,
} from "../test-server/utils/graphql-client";

beforeEach(async () => {
  await startTestServer();
});

afterEach(async () => {
  await stopTestServer();
});

describe("data version tests", () => {
  describe("data version in response", () => {
    it("should return the data version in response", async () => {
      const response = await graphqlRawRequest(
        simpleQuery.request,
        simpleQuery.headers
      );
      expect(response.extensions.globalDataVersion).toBeDefined();
    });
    it("should increment the data version on db updates", async () => {
      const dataVersionBeforeUpdate = (
        await graphqlRawRequest(simpleQuery.request, simpleQuery.headers)
      ).extensions.globalDataVersion;
      await graphqlRawRequest(mutation.request, mutation.headers, {
        firstName: "Amos",
        lastName: "Oz",
      });
      const dataVersionAfterUpdate = (
        await graphqlRawRequest(simpleQuery.request, simpleQuery.headers)
      ).extensions.globalDataVersion;
      expect(dataVersionAfterUpdate - 1).toEqual(dataVersionBeforeUpdate);
    });
    it("should increment only once for the same context", async () => {
      const dataVersionBeforeUpdate = (
        await graphqlRawRequest(simpleQuery.request, simpleQuery.headers)
      ).extensions.globalDataVersion;
      // @ts-ignore
      await graphqlRawRequest(mutation.requestTwo, mutation.headers, {
        firstName: "Amos",
        lastName: "Oz",
      });
      const dataVersionAfterUpdate = (
        await graphqlRawRequest(simpleQuery.request, simpleQuery.headers)
      ).extensions.globalDataVersion;
      expect(dataVersionAfterUpdate - 1).toEqual(dataVersionBeforeUpdate);
    });
  });
  describe("data version filtering", () => {
    it("should filter entities below the requested data version", async () => {
      const response = await graphQLRequest(
        dataVersionFiltering.request,
        dataVersionFiltering.headers
      );

      expect(response.allBooks.length).toEqual(1);
      expect(response.allBooks[0].title).toEqual("Book4");
    });
  });
});
