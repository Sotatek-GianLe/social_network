import { config } from "dotenv";

config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    cluster: process.env.CLUSTER,
  },
//   test: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     cluster: process.env.CLUSTER,
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     cluster: process.env.CLUSTER,
//   },
};
