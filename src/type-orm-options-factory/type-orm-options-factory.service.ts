import { Injectable } from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "../lib/interfaces";
import {getPolarisConnectionManager} from "@enigmatis/polaris-typeorm";

@Injectable()
export class TypeOrmOptionsFactoryService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions[] {
    const options: TypeOrmModuleOptions = {
      type: "postgres",
      database: "vulcan_db",
      username: "vulcan_usr@galileo-dbs",
      password: "vulcan_usr123",
      host: "galileo-dbs.postgres.database.azure.com",
      schema:"chen",
      dropSchema:true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      keepConnectionAlive: true
    };
    return [options];
  }
}

//npm i sqlite3@npm:sqlite3-offline
//
// const sqliteConnectionOptions: TypeOrmModuleOptions =

