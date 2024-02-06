import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
});

const User=new mongoose.model("User",userSchema);

export default User;