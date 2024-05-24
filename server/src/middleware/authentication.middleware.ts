import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Verify a user's identity. Authentication should always happen before authorization.
 * 
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunctioni}
 * @returns Response
 */
export const authentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req["user"] = data;
    next();
};