import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connDB } from "./utility/db.js";
import { authRourte } from "./router/Auth.js";
import { contectRouter } from "./router/Contect.js";
import { userRouter } from "./router/User.js";
import { adminRouter } from "./router/Admin.js";
import { formRouter } from "./router/Form-CRUD.js";
import { linkRouter } from "./router/Links.js";

const app = express();
dotenv.config();

//middaleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));
//router
app.use("/auth", authRourte);
app.use("/contect", contectRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/formdata", formRouter);
app.use("/api", linkRouter);
connDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Port Started");
  });
});
