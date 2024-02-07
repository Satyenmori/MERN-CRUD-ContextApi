import express from "express";
import { createContect } from "../controllers/Contect.js";

export const contectRouter = express.Router();

contectRouter.post("/add", createContect);
