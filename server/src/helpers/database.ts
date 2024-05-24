import { createDatabase, DatabaseCreateContext, DatabaseDropContext, dropDatabase } from "typeorm-extension";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

/**
 * Create a database if it doesn't exist.
 * @param connectionOptions {PostgresConnectionOptions} Connection info for database to be created
 * @param initialDb {string} Name of the starting (or default) database
 */
export const createDatabaseIfNotExists = async (connectionOptions: PostgresConnectionOptions, initialDb: string) => {
    console.log('Creating new database...')
    const context: DatabaseCreateContext = {
        initialDatabase: initialDb,
        options: connectionOptions,
        ifNotExist: true
    };

    await createDatabase(context).catch((error) => console.error(error));
    console.log('Created!')
};

/**
 * Drop a database if it exists.
 * @param dataSource {PostgresConnectionOptions} Connection info for database to be dropped
 * @param initialDb {string} Name of the starting (or default) database
 */
export const dropDatabaseIfExists = async (connectionOptions: PostgresConnectionOptions, initialDb: string) => {
    const context: DatabaseDropContext = {
        initialDatabase: initialDb,
        options: connectionOptions,
        ifExist: true
    }
    await dropDatabase(context);
};