import type { DataSourceOptions } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import type { DatabaseCreateContext, DatabaseDropContext } from "typeorm-extension";

/**
 * Create a database if it doesn't exist.
 * @param connectionOptions {DataSourceOptions} Connection info for database to be created
 * @param initialDb {string} Name of the starting (or default) database
 */
export const createDatabaseIfNotExists = async (connectionOptions: DataSourceOptions, initialDb: string) => {
    const context: DatabaseCreateContext = {
        initialDatabase: initialDb,
        options: connectionOptions,
        ifNotExist: true
    };

    await createDatabase(context).catch((error) => console.error(error));
};

/**
 * Drop a database if it exists.
 * @param dataSource {DataSourceOptions} Connection info for database to be dropped
 * @param initialDb {string} Name of the starting (or default) database
 */
export const dropDatabaseIfExists = async (connectionOptions: DataSourceOptions, initialDb: string) => {
    const context: DatabaseDropContext = {
        initialDatabase: initialDb,
        options: connectionOptions,
        ifExist: true
    }
    await dropDatabase(context);
};