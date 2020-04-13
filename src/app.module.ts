import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { PolarisModule } from './polaris/polaris.module';

@Module({
  imports: [
    RecipesModule,
    PolarisModule,
  ]
})
export class AppModule {}
