import { Request, Response } from "express";
import User from "../models/user";
import bc from "bcrypt";
import jwt from "jsonwebtoken";

export const registerHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Icomplete Input!" });

  const checkDuplicate = await User.findOne({ username: username }).exec();

  if (checkDuplicate) {
    return res.status(400).json({ message: `${username} Already Exists!` });
  } else {
    try {
      const hash = await bc.hash(password, 10);

      User.create({ username: username, password: hash });

      res.status(201).json({ message: `${username} is successfully created!` });
    } catch (e) {
      res.status(500).json({ message: `An Expected Error Occured!` });
    }
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Icomplete Input!" });

  const findUser = await User.findOne({ username: username }).exec();

  if (!findUser)
    return res.status(204).json({ message: `${username} Not Found` });

  const checkMatch = await bc.compare(password, findUser.password);

  if (checkMatch) {
    const roles = Object.values(findUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          roles: roles,
          id: findUser.id,
        },
      },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "240s" }
    );

    const refreshToken = jwt.sign(
      { UserInfo: { username: findUser.username } },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "1d" }
    );

    findUser.refreshToken = refreshToken;
    await findUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json(accessToken);
  } else {
    res.status(401).json({ message: "Incorrect Password" });
  }
};

export const logoutHandler = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};
