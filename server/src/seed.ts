import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { pgConnectionOptions, seederOptions } from "./data-sources";
import { createDatabaseIfNotExists } from "./helpers/database";

dotenv.config();
const { NODE_ENV, DB_DEFAULT_DATABASE } = process.env;

const dataSource: DataSource = new DataSource({...pgConnectionOptions, ...seederOptions});
let initializeAttempts = 0;

/**
 * Initializes the data source to seed. Creates the database if it doesn't exist.
 */
export const initAndSeedDatabase = async (dataSource: DataSource) => {
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
            if (error.code === "3D000") {
                await createDatabaseIfNotExists(dataSource.options, DB_DEFAULT_DATABASE);
                await initAndSeedDatabase(dataSource);
            } else {
                console.error(error.message);
            }
        })
};
initAndSeedDatabase(dataSource);