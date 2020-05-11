import { getPolarisConnectionManager } from "@enigmatis/polaris-typeorm";
import { bootstrap, app } from "./main";
import { graphQLRequest } from "./utils/graphql-client";
import * as initData from "../integration-tests/jsonRequestsAndHeaders/initData.json";

export async function startTestServer(): Promise<void> {
  await bootstrap();
  await graphQLRequest(initData.request, initData.headers);
}

export async function stopTestServer(): Promise<void> {
  await app.close();
  if (getPolarisConnectionManager().connections.length > 0) {
    for (let connection of getPolarisConnectionManager().connections) {
      await connection.close();
    }
  }
}
