import "reflect-metadata";

import { DataSource } from "typeorm";

import User from "~/server/db/entities/User";

const DataSourceInstance = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "user-manager",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: ["./migrations/*{.ts,.js}"],
});

await DataSourceInstance.initialize();

export default DataSourceInstance;
