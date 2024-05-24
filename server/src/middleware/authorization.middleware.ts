import { NextFunction, Request, Response } from "express";
import User, { UserRole } from "../entities/User";
import { getExpressAppInstance } from "../app-instance";

/**
 * Check the user's priviledges.
 * 
 * @param roles {UserRole[]} Roles allowed to perform an operation
 * @returns Response
 */
export const authorization = (roles: UserRole[]) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        const appDataSource = getExpressAppInstance().dbManager.getDataSource();
        const userRepository = appDataSource.getRepository(User);

        const user = await userRepository.findOne({
            // TODO: Change the one
            where: { id: 1 }
        });

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    }
}