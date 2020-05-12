import { Injectable, Type } from "@nestjs/common";
import { PolarisServerConfig } from "@enigmatis/polaris-core/dist/src/config/polaris-server-config";
import { getPolarisServerConfigFromOptions } from "@enigmatis/polaris-core/dist/src/server/configurations-manager";

import {options} from "../../test/test-server/polaris-server-options-factory/polaris-server-options-factory-service";

@Injectable()
export class PolarisServerConfigService {
  private readonly polarisServerConfig: PolarisServerConfig;

  constructor() {
    this.polarisServerConfig = getPolarisServerConfigFromOptions(options);
  }

  getPolarisServerConfig(): PolarisServerConfig {
    return this.polarisServerConfig;
  }
}
