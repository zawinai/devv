import { format } from "date-fns";
import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const logger = async (msg: string, logName: string) => {
  const logData = `${format(
    new Date(),
    "yyy:MM:dd\tHH:m:ss"
  )} \t ${randomUUID()} \t ${msg} \n`;

  try {
    if (!fs.existsSync("./dist/logs")) {
      await fsPromise.mkdir("./dist/logs");

      await fsPromise.appendFile(
        path.join(__dirname, "..", "logs", logName),
        logData
      );
    } else {
      await fsPromise.appendFile(
        path.join(__dirname, "..", "logs", logName),
        logData
      );
    }
  } catch (e) {
    console.log(e);
  }
};
