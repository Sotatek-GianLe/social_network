require("dotenv").config();
import * as express from "express";
import { createServer } from "http";
import db from "./models";

const app = express();
const server = createServer(app);
const port = process.env.PORT;
const appCf = "0.0.0.0";

db.mongoose
  .connect(db.url)
  .then(() => {
    server.listen(port, +appCf, async () => {
      console.log("Connected to the database!");
      console.log(`Server is running on port ${port}.`);
      //   appLog.info("Connected to the database!");
      //   appLog.info(`Server is running on port ${port}.`);
    });
  })
  .catch((err: Error) => {
    console.log("Cannot connect to the database!", err);
    // appLog.info("Cannot connect to the database!", err);
    process.exit();
  });
