import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAdminContectdata, getAdminUserdata } from "../controllers/Admin.js";
import { isAdmin } from "../middleware/isAdmin.js";
export const adminRouter = express.Router();

adminRouter
  .get("/user", authMiddleware,isAdmin, getAdminUserdata)
  .get("/contect",authMiddleware,isAdmin, getAdminContectdata);
