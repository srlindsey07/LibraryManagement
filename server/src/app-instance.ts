import type { DataSourceOptions } from "typeorm";
import ExpressApp from "./app";

let expressAppInstance: ExpressApp;

/** 
 * Create a new express app instance. 
 * @returns ExpressApp - New Express app instance.
 */
export const createExpressAppInstance = (
    connectionOptions: DataSourceOptions,
): ExpressApp => {
    expressAppInstance = new ExpressApp(connectionOptions);
    return expressAppInstance;
};

/**
 * Gets the current Express app instance.
 * @returns ExpressApp - current Express app instance.
 */
export const getExpressAppInstance = (): ExpressApp => expressAppInstance;