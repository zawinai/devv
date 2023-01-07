import express, { Express } from "express";

import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
  logoutHandler,
} from "../../controllers/userControllers";

const authRoute = express.Router();

authRoute.route("/register").post(registerHandler);
authRoute.route("/login").post(loginHandler);
authRoute.route("/refresh").get(refreshTokenHandler);
authRoute.route("/logout").post(logoutHandler);

export default authRoute;
