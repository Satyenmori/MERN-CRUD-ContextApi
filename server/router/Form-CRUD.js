import express from "express";
export const formRouter = express.Router();
import multer from "multer";
import {
  deleteFormData,
  FormAdd,
  FormEdit,
  getAllData,
  getSingleData,
} from "../controllers/Form-CRUD.js";

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const uploadFields = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "img", maxCount: 1 },
]);

formRouter
  .get("/", getAllData)
  .get("/:id", getSingleData)
  .post("/add", uploadFields, FormAdd)
  .patch("/edit/:id", uploadFields, FormEdit)
  .delete("/delete/:id", deleteFormData);
