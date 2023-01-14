import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import { Jwt } from "jsonwebtoken";
import bc from "bcrypt";

export const getAllPosts = async (req: Request, res: Response) => {
  const post = await Post.find();
  if (!post) {
    return res.status(204).json({ message: "No Posts!" });
  } else {
    return res.json(post);
  }
};

export const getPostDetail = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const findPost = await Post.findOne({ slug: slug }).exec();

  if (!findPost) {
    return res.status(403).json({ message: `${slug} Not Found` });
  } else {
    return res.status(200).json(findPost);
  }
};

export const getAuthUserPosts = async (req: Request, res: Response) => {
  if (!req.id) {
    return res.status(403).json({ message: "Id is required!" });
  } else {
    const userPosts = await Post.find({ user: req.id });
    if (!userPosts) {
      return res.status(204).json({ message: "No Data" });
    } else {
      return res.json(userPosts);
    }
  }
};

export const newPost = async (req: Request, res: Response) => {
  if (
    !req.body?.title ||
    !req.body?.body ||
    !req.body.slug ||
    !req.body.postusername
  ) {
    return res.status(400).json({ message: "Incompleted Input" });
  }

  const checkSlug = await Post.find({ slug: req.body.slug });

  if (checkSlug.length)
    return res.status(403).json({
      message: `This "${req.body.slug}" is already used Please try another unique slug`,
    });

  try {
    await Post.create({
      user: req.id,
      postusername: req.body.postusername,
      title: req.body.title,
      slug: req.body.slug,
      body: req.body.body,
    });

    res.status(201).json({ message: `New Data ${req.body.slug} Is Created.` });
  } catch (e) {
    throw new Error(e as string);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  if (!req.id || !req.body.id)
    return res.status(400).json({ message: "Id is required!" });

  const findPost = await Post.findOne({ _id: req.body.id }).exec();

  if (!findPost) {
    return res
      .status(204)
      .json({ message: `${req.body.slug} Not Found In Database` });
  } else if (req.id !== findPost.user.toString()) {
    return res.status(401).json({
      message:
        "This data is yours So you aren't allowed to modify or delete it",
    });
  } else {
    if (req.body.title) findPost.title = req.body.title;
    if (req.body.body) findPost.body = req.body.body;
    if (req.body.slug) findPost.slug = req.body.slug;
    findPost.edited = true;

    const result = await findPost.save();

    res.json(`The Data Has Been Updated \n ${result}`);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  if (!req.id) {
    return res.status(400).json({ message: "Id is required!" });
  }

  const { id } = req.params;

  const findData = await Post.findOne({ _id: id });

  if (!findData) {
    return res
      .status(204)
      .json({ message: `${req.body.id} Not Found In Database` });
  } else if (req.id !== findData.user.toString()) {
    return res.status(401).json({
      message:
        "This data is yours So you aren't allowed to modify or delete it",
    });
  } else {
    await findData.deleteOne({ _id: req.body.id });

    return res.json({ message: `${req.body.id} Has Been Deleted!` });
  }
};
