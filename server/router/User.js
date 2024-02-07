import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { userData } from "../controllers/User.js";

export const userRouter=express.Router();

userRouter.get("/",authMiddleware,userData)