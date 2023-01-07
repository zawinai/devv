import express, { Express } from "express";
import { verify } from "../../middlewares/verifyJWT";
import { authRoles } from "../../middlewares/verifyRoles";

import {
  getAllData,
  // getData,
  postNewData,
  getUserPosts,
  updateData,
  deleteData,
} from "../../controllers/dataController";

export const dataRoute = express.Router();

dataRoute
  .route("/")
  .get(getAllData)
  .post(verify, authRoles(["NUser"]), postNewData)
  .put(verify, authRoles(["NUser"]), updateData)
  .delete(authRoles(["NUser"]), deleteData);

dataRoute.route("/userposts").post(verify, getUserPosts);
