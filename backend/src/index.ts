import "reflect-metadata";
import dotenv from "dotenv-safe";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import path from "path";
import { VERSION } from './constants/settings'
import database from "./database";
import Routes from './constants/routes'

import ProductRoute from "./routes/product"
import ReportRoute from "./routes/report"

// Vars
dotenv.config();
const app = express();
database.init();

const onSuccessDatabaseConnection = async () => {
  // Static
  app.use(express.static(path.join(__dirname, "static")));

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use(`${VERSION.ONE}/${Routes.PRODUCT}`, ProductRoute);
  app.use(`${VERSION.ONE}/${Routes.REPORT}`, ReportRoute);

  // Server
  app.listen(
    process.env.NODE_PORT,
    () => `Listening to port: ${process.env.NODE_PORT}`
  );
};

createConnection()
  .then(onSuccessDatabaseConnection)
  .catch((error) => console.log(error));
