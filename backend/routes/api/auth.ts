import express, { Express } from "express";

import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../../controllers/userControllers";

const authRoute = express.Router();

authRoute.route("/").post(registerHandler);
authRoute.route("/login").post(loginHandler);
authRoute.route("/logout").get(logoutHandler);

export default authRoute;
