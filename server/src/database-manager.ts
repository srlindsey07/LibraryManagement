import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "./entities/User";
import { createDatabase, DatabaseCreateContext, dropDatabase } from "typeorm-extension";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { createDatabaseIfNotExists } from "./helpers/database";

dotenv.config();
const { DB_DEFAULT_DATABASE } = process.env;

export default class DatabaseManager {
    private connectionOptions: PostgresConnectionOptions = null;
    private dataSource: DataSource = null;
    private initializeAttempts = 0;

    constructor(private config: PostgresConnectionOptions) {
        this.connectionOptions = config;
    }

    /**
     * @returns connectionOptions {PostgresConnectionOptions} The current connection configuration options.
     */
    getConnectionOptions(): PostgresConnectionOptions {
        return this.connectionOptions;
    }

    /**
     * @returns dataSource {DataSource} The current connection configuration.
     */
    getDataSource() {
        return this.dataSource;
    }

    /** 
     * Create the datasource for the DB and initialize the DB connection.
     * If DB does not exist, create it and attempt DB connection again.
     */
    async initializeDataSource() {
        this.initializeAttempts++;

        if (this.initializeAttempts > 2) {
            console.error("Too many unsuccessful attempts to initialize the data source");
            process.exit();
        }

        this.dataSource = new DataSource({
            ...this.connectionOptions,
            entities: [User]
        });

        await this.dataSource
            .initialize()
            .then(async () => {
                console.log("Data source initialized");
            })
            .catch(async (error) => {
                // 3D000 is invalid catalog name
                if (error.code === "3D000") {
                    await createDatabaseIfNotExists(this.connectionOptions, DB_DEFAULT_DATABASE);
                    await this.initializeDataSource();
                } else {
                    console.error(error.message);
                }
            });
    }

    async disconnectDataSource() {
        if (this.dataSource) {
            await this.dataSource.dropDatabase();
            await this.dataSource.destroy();
        }
    }
}