import dotenv from "dotenv";
import { createExpressAppInstance, getExpressAppInstance } from "./app-instance";
import { pgConnectionOptions } from './data-sources';

dotenv.config();
const { PORT } = process.env;

/**
 * Create Express app if an instance does not already exist.
 */
const initAppAndListen = async () => {
    let expressApp = getExpressAppInstance();

    if (!expressApp) {
        expressApp = createExpressAppInstance(pgConnectionOptions);
        await expressApp.initializeApp();
    }

    await expressApp.startListening(parseInt(PORT) || 3000);
}
initAppAndListen();