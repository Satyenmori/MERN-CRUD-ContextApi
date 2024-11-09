import express from "express";
import { AddDoc, AddLink, getUserContent } from "../controllers/Link.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const linkRouter = express.Router();

linkRouter
  .post("/addlink", authMiddleware, AddLink)
  .post("/adddoc", authMiddleware, AddDoc)
  .get("/content", authMiddleware, getUserContent);
