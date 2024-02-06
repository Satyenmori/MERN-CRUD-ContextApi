import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connDB } from "./utility/db.js";
import { authRourte } from "./router/Auth.js";

const app = express();
dotenv.config();

//middaleware
const corsoption = {
  origin: "http://localhost:3000",
  method: "GET,POST,DELETE,HEAD,PATCH,PUT",
  credentials: true,
};
app.use(cors(corsoption));
app.use(express.json());

//router
app.use("/auth", authRourte);

connDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Port Started");
  });
});
