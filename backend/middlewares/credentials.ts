import { Request, Response, NextFunction } from "express";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin as string;

  if (process.env.WHITE_LIST && process.env.WHITE_LIST.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", origin); //problem
  }

  next();
};
