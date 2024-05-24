import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { pgConnectionOptions } from "./data-sources";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { createDatabaseIfNotExists } from "./helpers/database";

dotenv.config();
const { NODE_ENV, DB_DEFAULT_DATABASE } = process.env;

const connectionOptions: PostgresConnectionOptions = pgConnectionOptions;
const dataSource: DataSource = new DataSource(connectionOptions);
let initializeAttempts = 0;

/**
 * Initializes the data source to seed. Creates the database if it doesn't exist.
 */
const initializeDataSource = async () => {
    console.log(`Seeding in environment ${NODE_ENV}`)
    initializeAttempts++;

    if (initializeAttempts > 2) {
        console.error("Too many unsuccessful attempts to initialize the data source");
        process.exit();
    }

    dataSource.initialize()
        .then(async () => {
            console.log("Data source initialized!")
            await dataSource.synchronize(true);
            await runSeeders(dataSource);
            console.log("Database seeding complete");
            process.exit();
        })
        .catch(async (error) => {
            console.error("Database doesn't exist")
            if (error.code === "3D000") {
                await createDatabaseIfNotExists(connectionOptions, DB_DEFAULT_DATABASE);
                await initializeDataSource();
            } else {
                console.error(error.message);
            }
        })
};
initializeDataSource();