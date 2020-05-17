import { getPolarisConnectionManager } from "@enigmatis/polaris-typeorm";
import { bootstrap, app } from "./main";
import { graphQLRequest } from "./utils/graphql-client";
import * as initData from "../integration-tests/jsonRequestsAndHeaders/initData.json";

export async function startTestServer(): Promise<void> {
  await bootstrap();
  if (getPolarisConnectionManager().connections.length > 0) {
    let manager = getPolarisConnectionManager();
    for (let connection of manager.connections) {
      await connection.close();
    }
    Object.assign(manager, { connections: [] });
  }
  await graphQLRequest(initData.request, initData.headers);
}

export async function stopTestServer(): Promise<void> {
  await app.close();
}
