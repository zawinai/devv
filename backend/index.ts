import express, { Express, Request, Response } from "express";
const app: Express = express();
import mongoose from "mongoose";

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middlewares
import { errorlogger } from "./middlewares/errorHandler";
import { reqlogger } from "./middlewares/reqLogger";

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
import cookieParser from "cookie-parser";

ConnectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(credentials);
app.use(cors(corOPtions));
app.use(cookieParser("auth"));

app.use(reqlogger);

app.use("/auth", authRoute);
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

app.use(errorlogger);

mongoose.connection.once("open", () => {
  console.log("Connected to Database Successfully!");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
