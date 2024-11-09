import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctitle: { type: String },
  docurl: { type: String },
});

const Document = new mongoose.model("Document", documentSchema);

export default Document;