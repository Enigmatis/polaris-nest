import { Module } from "@nestjs/common";
import { GqlOptionsService } from "./polaris-gql-module-options.service";
import { PolarisServerConfigModule } from "../polaris-server-config/polaris-server-config.module";
import { PolarisLoggerModule } from "../polaris-logger/polaris-logger.module";
import { PolarisServerConfigService } from "../polaris-server-config/polaris-server-config.service";
import { PolarisLoggerService } from "../polaris-logger/polaris-logger.service";

@Module({
  imports: [PolarisServerConfigModule, PolarisLoggerModule],
  providers: [
    PolarisServerConfigService,
    PolarisLoggerService,
    GqlOptionsService,
  ],
  exports: [GqlOptionsService],
})
export class GqlOptionsModule {}
