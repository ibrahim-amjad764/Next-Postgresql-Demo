import { DataSource } from "typeorm";
import { User } from "@/src/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [User],
});
