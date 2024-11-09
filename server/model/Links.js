import mongoose from "mongoose";

const linksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  linkurl: { type: String },
});

const Link = new mongoose.model("Link", linksSchema);

export default Link;
