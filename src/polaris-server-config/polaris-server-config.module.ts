import { Module } from "@nestjs/common";
import { PolarisServerConfigService } from "./polaris-server-config.service";
import { PolarisServerOptionsModule } from "../polaris-server-options/polaris-server-options.module";

@Module({
  imports: [PolarisServerOptionsModule],
  providers: [PolarisServerConfigService],
  exports: [PolarisServerConfigService],
})
export class PolarisServerConfigModule {}
