import { Request, Response, NextFunction } from "express";
import Data from "../models/data";
import bc from "bcrypt";

export const getAllData = async (req: Request, res: Response) => {
  // const data = await Data.find({ user: req.id });

  const data = await Data.find();

  if (!data) {
    return res.status(204).json({ message: "No Data" });
  } else {
    return res.json(data);
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  if (!req.body.id || req.id) {
    return res.status(403).json({ message: "Id is required!" });
  } else {
    const id = bc.compare(req.body.id, req.id);
    const userPosts = await Data.find({ user: id });
    if (!userPosts) {
      return res.status(204).json({ message: "No Data" });
    } else {
      return res.json(userPosts);
    }
  }
};

// export const getData = async (req: Request, res: Response) => {
//   if (!req?.params?.id)
//     return res.status(400).json({ mssage: "an id is reequired bro" });

//   const findData = await Data.findOne({ _id: req.params.id });

//   if (!findData) {
//     return res
//       .status(204)
//       .json({ message: `${req.params.id} Not Found In Database` });
//   } else {
//     return res.json(findData);
//   }
// };

export const postNewData = async (req: Request, res: Response) => {
  if (!req.body?.title || !req.body?.body) {
    return res.status(400).json({ message: "Incompleted Input" });
  }

  try {
    await Data.create({
      user: req.id,
      title: req.body.title,
      body: req.body.body,
    });

    res.status(201).json({ message: `New Data ${req.body.title} Is Created.` });
  } catch (e) {
    throw new Error(e as string);
  }
};

export const updateData = async (req: Request, res: Response) => {
  if (!req.id || !req.body.id)
    return res.status(400).json({ message: "Id is required!" });

  const findData = await Data.findOne({ _id: req.body.id });

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
    if (req.body.title) findData.title = req.body.title;
    if (req.body.body) findData.body = req.body.title;

    const result = await findData.save();

    res.json(`The Data Has Been Updated \n ${result}`);
  }
};

export const deleteData = async (req: Request, res: Response) => {
  if (!req.id || !req.body.id)
    return res.status(400).json({ message: "Id is required!" });

  const findData = await Data.findOne({ _id: req.body.id });

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
