import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import User from "../../src/entities/User";

dotenv.config({ path: `.env.${process.env.NODE_ENV}`});
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

export const mockDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    synchronize: NODE_ENV === "dev" ? false : false,
    logging: NODE_ENV === "dev" ? false : false,
    entities: [User],
};

export default mockDataSourceOptions;