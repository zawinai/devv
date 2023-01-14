import { Request, Response } from "express";
import User from "../models/user";
import Post from "../models/post";

export const getUserProfile = async (req: Request, res: Response) => {
  if (!req.params.username)
    return res.status(400).json({ message: "username is required" });

  const { username } = req.params; // postusername

  const findUser = await User.findOne({ username: username });

  const posts = await Post.find({ postusername: username });

  if (findUser && posts) {
    res.status(200).json(posts);
  } else {
    return res.status(400).json({ message: `${username} not foud` });
  }
};
