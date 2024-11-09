import express from "express";
import {
  addCard,
  AddDoc,
  AddLink,
  getUserCards,
  getUserContent,
} from "../controllers/Link.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const linkRouter = express.Router();

linkRouter
  .post("/addlink", authMiddleware, AddLink)
  .post("/adddoc", authMiddleware, AddDoc)
  .get("/content", authMiddleware, getUserContent)
  .post("/addcard", authMiddleware, addCard)
  .get("/usercard", authMiddleware, getUserCards);
