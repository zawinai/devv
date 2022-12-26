import express, { Express } from "express";
import { verify } from "../../middlewares/verifyJWT";
import { authRoles } from "../../middlewares/verifyRoles";

import {
  getAllData,
  // getData,
  postNewData,
  updateData,
  deleteData,
} from "../../controllers/dataController";

export const dataRoute = express.Router();

dataRoute
  .route("/")
  .get(verify, getAllData)
  // .get(getAllData)
  .post(authRoles(["NUser"]), postNewData)
  .put(updateData)
  .delete(deleteData);

// dataRoute.route("/:id").get(getData);
