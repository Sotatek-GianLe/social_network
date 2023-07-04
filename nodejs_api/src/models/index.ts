"use strict";

require("dotenv").config();
import mongoose from "mongoose";
import * as config from "../config/config";
import UserModel from "./user.model";
const env = process.env.NODE_ENV || "development";
// const envConfig = config[env];

mongoose.Promise = global.Promise;
const conn = mongoose.connection;
const db = {
  // Information connect mongodb
  mongoose,
  conn,
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,

  // Model of project
  UserCollection: UserModel(),
};

export default db;
