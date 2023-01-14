import express, { Express } from "express";
import { getUserProfile } from "../../controllers/userControllers";

export const userRoute = express.Router();

userRoute.route("/:username").get(getUserProfile);
