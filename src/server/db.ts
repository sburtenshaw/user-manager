import { DataSource } from "typeorm";

import "reflect-metadata";

const DataSourceInstance = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "user-manager",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export { DataSourceInstance };
