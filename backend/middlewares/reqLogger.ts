import { Request, Response, NextFunction } from "express";
import { logger } from "./eventLogger";

export const reqlogger = (req: Request, res: Response, next: NextFunction) => {
  logger(`${req.originalUrl} ${req.method} \t${req.path}`, "requests.txt");
  next();
};
