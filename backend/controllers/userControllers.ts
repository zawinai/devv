import { Request, Response } from "express";
import User from "../models/user";
import bc from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email)
    return res.status(400).json({ message: "Icomplete Input!" });

  const checkDuplicate = await User.findOne({ email: email }).exec();

  if (checkDuplicate) {
    return res.status(400).json({ message: `${email} Already Exists!` });
  } else {
    try {
      const hash = await bc.hash(password, 10);

      User.create({ username: username, email: email, password: hash });

      res.status(201).json({ message: `${username} is successfully created!` });
    } catch (e) {
      res.status(500).json({ message: `An Expected Error Occured!` });
    }
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Icomplete Input!" });

  const findUser = await User.findOne({ email: email }).exec();

  if (!findUser) return res.status(204).json({ message: `${email} Not Found` });

  const checkMatch = await bc.compare(password, findUser.password);

  if (checkMatch) {
    const roles = Object.values(findUser.roles);
    const { username } = findUser;

    const id = await bc.hash(findUser._id.toString(), 10);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          email: findUser.email,
          roles: roles,
          id: findUser.id,
        },
      },
      process.env.ACCESS_TOKEN as Secret,
      { expiresIn: "240s" }
    );

    const refreshToken = jwt.sign(
      {
        UserInfo: { username: findUser.username, email: findUser.email, roles },
      },
      process.env.REFRESH_TOKEN as Secret,
      { expiresIn: "10s" }
      // { expiresIn: "1h" }
    );

    findUser.refreshToken = refreshToken;

    await findUser.save();

    res.cookie("auth", refreshToken, {
      httpOnly: true,
      // sameSite: "none", // took me 4 hours straight to figure out why res isn't setting the cookie!
      // signed: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ id, username, email, accessToken, roles });
  } else {
    res.status(401).json({ message: "Incorrect Password" });
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (!cookie?.auth) {
    return res.status(401).json({ message: "No Cookie Token" });
  } else {
    const refreshToken = cookie.auth;

    const findUser = await User.findOne({ refreshToken }).exec();

    if (!findUser) return res.status(404).json({ message: "User not found" });

    try {
      interface JwtPayload {
        UserInfo: {
          username: string;
          email: string;
          roles: string[];
        };
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN as Secret
      ) as JwtPayload;

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.UserInfo.username,
            email: decoded.UserInfo.email,
            roles: decoded.UserInfo.roles,
          },
        },
        process.env.REFRESH_TOKEN as Secret,
        { expiresIn: "1d" }
      );

      const id = await bc.hash(findUser._id.toString(), 10);
      const { username, roles, email } = findUser;

      return res.json({ id, accessToken, roles, username, email });
    } catch (error) {
      return res.status(403);
    }
  }
};

export const logoutHandler = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.auth) return res.sendStatus(204); //No content
  res.clearCookie("auth", { httpOnly: true, secure: true });
  return res.json({ message: "Cookie cleared" });
};
