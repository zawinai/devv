import express, { Express } from "express";
import { verify } from "../../middlewares/verifyJWT";
import { authRoles } from "../../middlewares/verifyRoles";

import {
  getAllPosts,
  getPostDetail,
  // getData,
  newPost,
  getAuthUserPosts,
  updatePost,
  deletePost,
} from "../../controllers/postControllers";

export const dataRoute = express.Router();

dataRoute
  .route("/")
  .get(getAllPosts)
  .post(verify, authRoles(["NUser"]), newPost)
  .put(verify, authRoles(["NUser"]), updatePost);

dataRoute.route("/userposts").get(verify, getAuthUserPosts);
dataRoute.route("/:slug").get(getPostDetail);
dataRoute.route("/:id").delete(verify, authRoles(["NUser"]), deletePost);
