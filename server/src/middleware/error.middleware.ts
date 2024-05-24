import { NextFunction, Request, Response } from "express";

/**
 * Handle any errors.
 * 
 * @param error {Error}
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 * @returns Response
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${error.message}`);
  return res.status(500).json({ message: "Internal server error" });
};