import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  deleteContect,
  deleteUser,
  getAdminContectdata,
  getAdminUserdata,
  getUserbyId,
  updateUserbyId,
} from "../controllers/Admin.js";
import { isAdmin } from "../middleware/isAdmin.js";
export const adminRouter = express.Router();

adminRouter
  .get("/user", authMiddleware, isAdmin, getAdminUserdata)
  .get("/contect", authMiddleware, isAdmin, getAdminContectdata)
  .delete("/user/delete/:id",authMiddleware, isAdmin, deleteUser)
  .delete("/contect/delete/:id",authMiddleware, isAdmin, deleteContect)
  .get("/users/:id",authMiddleware, isAdmin, getUserbyId)
  .patch("/users/update/:id",authMiddleware, isAdmin, updateUserbyId);
