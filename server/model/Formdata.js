import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    location: { type: String, required: true, trim: true },
    img: { type: String },
    images: { type: Array },
  },
  {
    timestamps: true,
  }
);

const formModel = new mongoose.model("Formdata", formSchema);

export default formModel;
