import { Request, Response, NextFunction } from "express";
import { logger } from "./eventLogger";

export const errorlogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger(
    `${req.originalUrl} \t ${req.method} \t${req.path} \n ${error}`,
    "error.txt"
  );
  next();
};
