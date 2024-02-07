import mongoose from "mongoose";

const contectSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  message: { type: String, require: true },
});

const Contect=new mongoose.model("Contect",contectSchema)

export default Contect;
