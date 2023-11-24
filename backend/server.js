import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import cors from "cors";
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

// app.use(cors());
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    "http://localhost:3000",
    "https://classicblogspacebackend.onrender.com",
    "https://classic-blog-space.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const url = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.listen(PORT, () => console.log(`Server is running on: ${url} on: ${PORT}`));

Connection(DB_URL);
