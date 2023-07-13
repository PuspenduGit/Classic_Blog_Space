import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Router)


const url = process.env.BASE_URL
const PORT = process.env.PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.listen(PORT, () =>
  console.log(
    `Server is running on: ${url} `
  )
);

const URL = `mongodb://${username}:${password}@ac-n7uglmv-shard-00-00.xcqkvui.mongodb.net:27017,ac-n7uglmv-shard-00-01.xcqkvui.mongodb.net:27017,ac-n7uglmv-shard-00-02.xcqkvui.mongodb.net:27017/?ssl=true&replicaSet=atlas-ek872t-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);
