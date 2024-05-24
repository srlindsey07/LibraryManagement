import User from "./entities/User";
import dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { UserFactory } from "./seeding/user.factory";
import { SeederOptions } from "typeorm-extension";
import { UserSeeder } from "./seeding/user-seeder";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const pgConnectionOptions: PostgresConnectionOptions & SeederOptions = {
    name: "dev",
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    factories: [UserFactory],
    seeds: [UserSeeder]
};