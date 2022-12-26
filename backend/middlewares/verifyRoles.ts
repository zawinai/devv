import { Request, Response, NextFunction } from "express";

export const authRoles = (authRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.roles) {
      return res.status(401).json({ message: "You're not Authorized" });
    } else {
      const result = req.roles
        .map((role: string) => authRoles.includes(role))
        .find((value: boolean) => value === true);
      console.log(result);
      if (!result) {
        return res.status(401).json({ message: "You're not Authorized" });
      } else {
        next();
      }
    }
  };
};
