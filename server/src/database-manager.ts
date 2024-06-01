import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import User from "./entities/User";
import { createDatabaseIfNotExists } from "./helpers/database";

dotenv.config();
const { DB_DEFAULT_DATABASE } = process.env;

export default class DatabaseManager {
    private connectionOptions: DataSourceOptions = null;
    private dataSource: DataSource = null;
    private initializeAttempts = 0;

    constructor(private config: DataSourceOptions) {
        this.connectionOptions = config;
    }

    /**
     * @returns connectionOptions {DataSourceOptions} The current connection configuration options.
     */
    getConnectionOptions(): DataSourceOptions {
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
            // entities: [User],
        });

        if (!this.dataSource.isInitialized) {
            await createDatabaseIfNotExists(this.connectionOptions, DB_DEFAULT_DATABASE)
                .catch((error) => console.error("Could not create database"));
        }

        await this.dataSource
            .initialize()
            .then(() => console.log("INITIALIZED!"))        
            .catch((error) => console.log(error))
    }

    async disconnectDataSource() {
        if (this.dataSource) {
            await this.dataSource.dropDatabase();
            await this.dataSource.destroy();
        }
    }
}