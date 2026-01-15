import { DataSource } from "typeorm";
import { User } from "@/src/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "126126",
  database: "next_js_database",
  synchronize: false,
  logging: true,
  entities: [User],
});

// DATABASE_URL=postgres://postgres:126126@localhost:5432/next_js_database


