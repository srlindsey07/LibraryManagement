import "reflect-metadata";
import express from "express";
import { Express } from "express";
import { Request, Response } from "express";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import DatabaseManager from "./database-manager";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default class ExpressApp {
    app: Express;
    dbManager: DatabaseManager;

    private server: any;

    /**
     * Create Express app and set PostgresConnectionOptions in the DatabaseManager.
     * @param PostgresConnectionOptions 
     */
    constructor(connectionOptions: PostgresConnectionOptions) {
        this.app = express();
        this.dbManager = new DatabaseManager(connectionOptions);
    }

    startListening(port: number): void {
        this.server = this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    stopListening(): void {
        if (this.server) {
            this.server.close(() => {});
        }
    }

    private async connectToDb(): Promise<void> {
        try {
            await this.dbManager.initializeDataSource();
        } catch (error) {
            console.error(error);
        }
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(errorHandler);
    }

    private setupRoutes(): void {
        this.app.use("/auth", authRouter);
        this.app.use("/api", userRouter);

        this.app.get("*", (req: Request, res: Response) => {
            res.status(404).json({ message: "Resource not found" });
        });
    }

    /**
     * Connect to database using the datasource options previously provided
     * and setup Middleware and routes.
     */
    async initializeApp(): Promise<void> {
        await this.connectToDb();
        this.setupMiddleware();
        this.setupRoutes();
    }
}