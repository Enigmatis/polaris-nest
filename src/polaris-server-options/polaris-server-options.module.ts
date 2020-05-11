import { Module } from "@nestjs/common";
import { PolarisServerOptionsService } from "./polaris-server-options.service";

@Module({
  providers: [PolarisServerOptionsService],
  exports: [PolarisServerOptionsService],
})
export class PolarisServerOptionsModule {}
