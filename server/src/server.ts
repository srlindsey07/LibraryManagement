import dotenv from "dotenv";
import { createExpressAppInstance, getExpressAppInstance } from "./app-instance";
import { pgConnectionOptions } from './data-sources';
import type { DataSourceOptions } from "typeorm";

dotenv.config();
const { PORT } = process.env;

/**
 * Create Express app if an instance does not already exist.
 */
export const initAppAndListen = async (connectionOptions: DataSourceOptions, port: number) => {
    let expressApp = getExpressAppInstance();

    if (!expressApp) {
        expressApp = createExpressAppInstance(connectionOptions);
        await expressApp.initializeApp();
    }

    await expressApp.startListening(port);
}
initAppAndListen(pgConnectionOptions, parseInt(PORT) || 3000);