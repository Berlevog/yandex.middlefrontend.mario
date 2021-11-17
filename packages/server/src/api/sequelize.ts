import { Sequelize, SequelizeOptions } from "sequelize-typescript";
require("dotenv").config();

const defaultDB = {
  host: "localhost",
  port: 5432,
  dialect: "postgres" as SequelizeOptions["dialect"],
  user: "root",
  password: "root",
  database: "db",
};

const PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : defaultDB.port;

const DIALECT: SequelizeOptions["dialect"] = process.env.DB_DRIVER
  ? (process.env.DB_DRIVER as SequelizeOptions["dialect"])
  : defaultDB.dialect;

const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOST || defaultDB.host,
  port: PORT,
  dialect: DIALECT,
  username: process.env.DB_USER || defaultDB.user,
  password: process.env.DB_PASSWORD || defaultDB.password,
  database: process.env.DB_DATABASE || defaultDB.database,
  models: [__dirname + "/models"],
};

export const sequelize = new Sequelize(sequelizeOptions);
