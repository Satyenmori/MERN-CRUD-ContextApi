import express from "express"
import { checkUser, createUser } from "../controllers/Auth.js";

export const authRourte=express.Router();

authRourte.post("/signup",createUser).post("/signin",checkUser);