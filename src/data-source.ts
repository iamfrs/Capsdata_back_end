import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "machine_test",
  synchronize: true,
  logging: true,
  entities: [ User],
  migrations: [],
  subscribers: [],
});
