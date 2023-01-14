import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bc from "bcrypt";

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized!" });
  } else {
    if (typeof header === "string") {
      const token = header?.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN as string, (e) => {
        if (e) {
          return res
            .status(401)
            .json({ message: "Token Expired or Other Error" });
        } else {
          const { UserInfo } = jwt.verify(
            token,
            process.env.ACCESS_TOKEN as string
          ) as JwtPayload;

          req.user = UserInfo.username; // @types/passport
          req.roles = UserInfo.roles;
          req.id = UserInfo.id;
          next();
        }
      });
    }
  }
};
