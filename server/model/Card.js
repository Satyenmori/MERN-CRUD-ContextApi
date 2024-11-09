import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  jobTitle: { type: String },
  company: { type: String },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
