import { pgConnectionOptions } from './../../src/data-sources';
import { mockDataSourceOptions } from './mock-data-source';
import { Express } from "express";
import { dropDatabase } from 'typeorm-extension';
import { createExpressAppInstance, getExpressAppInstance } from './../../src/app-instance';
import { BaseEntity, DataSourceOptions, DeleteResult, Repository } from "typeorm"
import ExpressApp from '../../src/app';
import DatabaseManager from '../../src/database-manager';
import dotenv from "dotenv";
import { dropDatabaseIfExists } from '../../src/helpers/database';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

// should be using .env.test since I provided it in the jest.config.js
dotenv.config();
const { DB_DEFAULT_DATABASE } = process.env;

export let testExpressApp: ExpressApp;

/**
 * Create a new express app instance, initializes it and listens on port 3001.
 * @param dataSourceOptions (optional) - Default value in ./utils/mock-data-source.ts
 */
export const startApp = async (dataSourceOptions = pgConnectionOptions) => {
   testExpressApp = createExpressAppInstance(dataSourceOptions);

   await testExpressApp.initializeApp();

   testExpressApp.startListening(3001);
};

/**
 * Express app stops listening, and disconnects and drops database.
 */
export const stopApp = async () => {
    await testExpressApp.stopListening();
    await getDatabaseManager().disconnectDataSource();
    await dropDatabaseIfExists(
        getDatabaseManager().getDataSource().options as PostgresConnectionOptions, 
        DB_DEFAULT_DATABASE!
);
};

export const getDatabaseManager = (): DatabaseManager => {
    return getExpressAppInstance().dbManager;
};

/**
 * Gets repository for the provided Entity.
 * @param entity 
 * @returns Repository
 */
export const getRepository = <T extends BaseEntity>(
    entity: new () => T
): Repository<T> => {
    return getDatabaseManager().getDataSource().getRepository(entity);
};

export const getApp = (): Express => {
    return testExpressApp.app;
};

/**
 * Drops the database of the provided Entity.
 * @param entity 
 */
export const cleanUpDatabase = async <T extends BaseEntity>(
    entity: new () => T
): Promise<any> => {
    await dropDatabase;
};