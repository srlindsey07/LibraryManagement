import User from "./entities/User";
import dotenv from "dotenv";
import { UserFactory } from "./seeding/user.factory";
import type { SeederOptions } from "typeorm-extension";
import { UserSeeder } from "./seeding/user-seeder";
import type { DataSourceOptions } from "typeorm";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

export const pgConnectionOptions: DataSourceOptions = {
    name: NODE_ENV,
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    dropSchema: NODE_ENV === "test",
    logging: false,
    entities: [User],
};

export const seederOptions: SeederOptions = {
    factories: [UserFactory],
    seeds: [UserSeeder]
}