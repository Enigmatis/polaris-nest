import { getPolarisConnectionManager } from "@enigmatis/polaris-typeorm";
import { bootstrap, app } from "./main";

export async function startTestServer(): Promise<void> {
  await bootstrap();
}

export async function stopTestServer(): Promise<void> {
  await app.close();
  if (getPolarisConnectionManager().connections.length > 0) {
    for (let connection of getPolarisConnectionManager().connections) {
      await connection.close();
    }
  }
}
