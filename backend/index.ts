import express, { Express, Request, Response } from "express";
const app: Express = express();
import mongoose from "mongoose";
import fs, { existsSync } from "fs";

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middlewares
import { logger } from "./middlewares/eventLogger";
// routes
import { dataRoute } from "./routes/api/data";
import authRoute from "./routes/api/auth";
// DB
import { ConnectDB } from "./config/dbConnect";
// auth
import { verify } from "./middlewares/verifyJWT";
//Cors
import { credentials } from "./middlewares/credentials";
import { corOPtions } from "./config/corsOpts";
import cors from "cors";

ConnectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(process.env.WHITE_LIST);

app.use(credentials);
app.use(cors(corOPtions));

app.use((req, res, next) => {
  logger(`${req.method} \t ${req.path}`, "request.txt");
  next();
});

app.use("/auth", authRoute);
app.use(verify);
app.use("/data", dataRoute);

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("<h1>404 Not Found</h1>");
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    if (req.accepts("text")) {
      res.type("txt").send("404 not found");
    }
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database Successfully!");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
